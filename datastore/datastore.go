/*
   Velociraptor - Hunting Evil
   Copyright (C) 2019 Velocidex Innovations.

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published
   by the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
// An interface into persistent data storage.
package datastore

import (
	"errors"
	"sync"
	"time"

	"google.golang.org/protobuf/proto"
	config_proto "www.velocidex.com/golang/velociraptor/config/proto"
	"www.velocidex.com/golang/velociraptor/file_store/api"
)

var (
	StopIteration = errors.New("StopIteration")

	// Cache the datastore implementations. The datastore is
	// essentially a singleton determined by the configuration at
	// start time.
	ds_mu  sync.Mutex
	g_impl DataStore
)

type SortingSense int

const (
	UNSORTED  = SortingSense(0)
	SORT_UP   = SortingSense(1)
	SORT_DOWN = SortingSense(2)
)

type DatastoreInfo struct {
	Name     string
	Modified time.Time
}

// When WalkFunc return StopIteration we exit the walk.
type WalkFunc func(urn api.DSPathSpec) error

// Raw level access only used internally rarely.
type RawDataStore interface {
	GetBuffer(config_obj *config_proto.Config, urn api.DSPathSpec) ([]byte, error)
	SetBuffer(config_obj *config_proto.Config, urn api.DSPathSpec,
		data []byte, completion func()) error
}

type DataStore interface {
	// Reads a stored message from the datastore. If there is no
	// stored message at this URN, the function returns an
	// os.ErrNotExist error.
	GetSubject(
		config_obj *config_proto.Config,
		urn api.DSPathSpec,
		message proto.Message) error

	// SetSubject writes the data to the datastore. The data is
	// written asynchronously and may not be immediately visible by
	// other nodes.
	SetSubject(
		config_obj *config_proto.Config,
		urn api.DSPathSpec,
		message proto.Message) error

	// Writes the data asynchronously and fires the completion
	// callback when the data hits the disk and will become visibile
	// to other nodes.
	SetSubjectWithCompletion(
		config_obj *config_proto.Config,
		urn api.DSPathSpec,
		message proto.Message,
		completion func()) error

	// DeleteSubject will asynchronously remove the item from the data
	// store.
	DeleteSubject(
		config_obj *config_proto.Config,
		urn api.DSPathSpec) error

	// Lists all the children of a URN.
	ListChildren(
		config_obj *config_proto.Config,
		urn api.DSPathSpec) ([]api.DSPathSpec, error)

	Debug(config_obj *config_proto.Config)

	// Called to close all db handles etc. Not thread safe.
	Close()
}

func GetDB(config_obj *config_proto.Config) (DataStore, error) {
	ds_mu.Lock()
	defer ds_mu.Unlock()

	if g_impl != nil {
		return g_impl, nil
	}

	if config_obj.Datastore == nil {
		return nil, errors.New("no datastore configured")
	}

	return getImpl(config_obj.Datastore.Implementation, config_obj)
}

func getImpl(implementation string,
	config_obj *config_proto.Config) (DataStore, error) {
	switch implementation {
	case "FileBaseDataStore":
		return file_based_imp, nil

	case "RemoteFileDataStore":
		return remote_datastopre_imp, nil

	case "Memcache":
		if memcache_imp == nil {
			memcache_imp = NewMemcacheDataStore()
		}
		return memcache_imp, nil

	case "MemcacheFileDataStore":
		if memcache_file_imp == nil {
			memcache_file_imp = NewMemcacheFileDataStore()
		}
		return memcache_file_imp, nil

	case "Test":
		if memcache_imp == nil {
			memcache_imp = NewMemcacheDataStore()
		}
		return memcache_imp, nil

	default:
		return nil, errors.New("no datastore implementation " +
			config_obj.Datastore.Implementation)
	}
}

func SetGlobalDatastore(
	implementation string,
	config_obj *config_proto.Config) (err error) {
	ds_mu.Lock()
	defer ds_mu.Unlock()

	g_impl, err = getImpl(implementation, config_obj)
	return err
}
