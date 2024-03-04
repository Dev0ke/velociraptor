import _ from 'lodash';
import hex2a from "./utils";

import React from 'react';
import Alert from 'react-bootstrap/Alert';
import humanizeDuration from "humanize-duration";

import automated from "./ch.json";

const Chinese = {
    "SEARCH_CLIENTS": "客户端搜索",
    "Quarantine description": (<>
          <p>试图隔离这台主机</p>
          <p>
          隔离期间不能与 Velociraptor 服务器以外的其他网络进行通信。
          </p>
        </>),
    "Cannot Quarantine host": "不能隔离主机",
    "Cannot Quarantine host message": (os_name, quarantine_artifact)=>
        <>
          <Alert variant="warning">
            { quarantine_artifact ?
              <p>这个 Velociraptor实例没有检验运行{os_name}的主机所需要的<b>{quarantine_artifact}</b>伪像</p> :
              <p>实例没有定义用于检疫运行{os_name}的主机的伪像名称。</p>
            }
          </Alert>
        </>,
    "Client ID": "客户端 ID",
    "Agent Version": "代理版本",
    "Agent Name": "代理名称",
    "First Seen At": "首次连接日期",
    "Last Seen At": "最新连接日期",
    "Last Seen IP": "最新 IP 地址",
    "Labels": "标签",
    "Operating System": "操作系统",
    "Hostname": "主机名",
    "FQDN": "FQDN",
    "Release": "发布",
    "Architecture": "架构",
    "Client Metadata": "客户端元数据",
    "Interrogate": "调查",
    "VFS": "VFS",
    "Collected": "收集",
    "Unquarantine Host": "非隔离主机",
    "Quarantine Host": "隔离主机",
    "Quarantine Message": "隔离消息",
    "Add Label": "添加标签",
    "Overview": "概览",
    "VQL Drilldown": "VQL 的详细调查",
    "Shell": "Shel",
    "Close": "关闭",
    "Connected": "连接",
    "seconds": "秒",
    "minutes": "分",
    "hours": "时",
    "days": "日",
    "time_ago": function(value, unit) {
        unit = Chinese[unit] || unit;
        return value + ' ' + unit + ' 前';
    },
    "Online": "在线",
    "Label Clients": "客户端标签",
    "Existing": "既存",
    "A new label": "新标签",
    "Add it!": "追加",
    "Delete Clients": "客户端删除",
    "DeleteMessage": "我们将永久删除以下客户端",
    "Yeah do it!": "对了，就这样做！",
    "Goto Page": "打开页面",
    "Table is Empty": "列表已空",
    "OS Version": "OS 版本",
    "Select a label": "标签的选择",
    "Expand": "扩大",
    "Collapse": "关闭",
    "Hide Output": "隐藏输出",
    "Load Output": "加载输出",
    "Stop": "停止",
    "Delete": "删除",
    "Run command on client": "在客户端执行命令",
    "Type VQL to run on the client": "输入 VQL，在客户端运行",
    "Run VQL on client": "在客户端运行 VQL",
    "Artifact details": "工件细节",
    "Artifact Name": "工件名称",
    "Upload artifacts from a Zip pack": "上传工件压缩包",
    "Select artifact pack (Zip file with YAML definitions)": "选择工件包(YAML 定义的Zip 文件)",
    "Click to upload artifact pack file": "点击，上传工件包文件",
    "Delete an artifact": "删除工件",
    "You are about to delete": name=>name+"被删除。",
    "Add an Artifact": "添加工件o",
    "Edit an Artifact": "编辑工件",
    "Delete Artifact": "删除工件",
    "Hunt Artifact": "寻找工件ト",
    "Collect Artifact": "收集工件",
    "Upload Artifact Pack": "上传工件包",
    "Search for artifact": "工件搜索",
    "Search for an artifact to view it": "搜索并显示工件",
    "Edit Artifact": name=>{
      return name + "编辑工件";
    },
    "Create a new artifact": "创建新工件",
    "Save": "保存",
    "Search": "搜索",
    "Toggle Main Menu": "切换主菜单",
    "Main Menu": "主菜单",
    "Welcome": "欢迎光临",

    // Keyboard navigation.
    "Global hotkeys": "全球热键",
    "Goto dashboard": "打开仪表盘",
    "Collected artifacts": "已收集的工件",
    "Show/Hide keyboard hotkeys help": "显示/隐藏键盘热键帮助",
    "Focus client search box": "客户端搜索框",
    "New Artifact Collection Wizard": "新艺术收藏品 Wizard",
    "Artifact Selection Step": "工件选择步骤",
    "Parameters configuration Step": "参数设定的步骤",
    "Collection resource specification": "收集数据的规范",
    "Launch artifact": "调查工件",
    "Go to next step": "进入下一步",
    "Go to previous step": "回到上一个步骤",
    "Select next collection": "选择下一个收藏",
    "Select previous collection": "选择上一个收藏",
    "View selected collection results": "显示所选收集的结果",
    "View selected collection overview": "显示所选的收集的概要",
    "View selected collection logs": "显示所选的收集日志",
    "View selected collection uploaded files": "显示所选收藏的上传文件",
    "Editor shortcuts": "编辑器快捷键",
    "Popup the editor configuration dialog": "弹出编辑器设置对话框",
    "Save editor contents": "保存编辑器的内容",
    "Keyboard shortcuts": "键盘快捷键",
    "Yes do it!": "是！",
    "Inspect Raw JSON": "确认原始 JSON 数据",
    "Raw Response JSON": "原始回复",
    "Show/Hide Columns": "列的显示/不显示",
    "Set All": "设置所有",
    "Clear All": "清除一切",
    "Exit Fullscreen": "关闭全屏",
    "Artifact Collection": "工件收藏",
    "Uploaded Files": "上传文件",
    "Results": "结果",
    "Flow Details": "流的细节",
    "Notebook for Collection": name=>name + "收藏的笔记",
    "Please click a collection in the above table":"请从上面的表点击收集",
    "Artifact Names": "工件名称",
    "Creator": "作者",
    "Create Time": "创造時間",
    "Start Time": "开始時間",
    "Last Active": "最终运行时间",
    "Duration": "持续时间",
    " Running...": " 执行中…",
    "State": "状态",
    "Error": "错误",
    "CPU Limit": "CPU 极限",
    "IOPS Limit": "IOPS 极限",
    "Timeout": "超时",
    "Max Rows": "最大列数",
    "Max MB": "最大MB数",
    "Artifacts with Results": "工件结果",
    "Total Rows": "合计行数",
    "Uploaded Bytes": "上传字节数",
    "Files uploaded": "上传文件",
    "Download Results": "下载结果",
    "Set a password in user preferences to lock the download file.": "在用户设置中设置密码， 锁定下载文件。",
    "Prepare Download": "准备下载",
    "Prepare Collection Report": "收集报告的准备",
    "Available Downloads": "可下载",
    "Size (Mb)": "大小 (MB)",
    "Date": "日期",
    "Unlimited": "无限",
    "rows": "行数",
    "Request sent to client": "请求已发送到客户端",
    "Description": "详细",
    "Created": "被创造",
    "Manually add collection to hunt": "手动添加收集到 hun",
    "No compatible hunts.": "没有兼容的 hunts。",
    "Please create a hunt that collects one or more of the following artifacts.":"请创建一个搜索，收集以下一个或多个工件。",
    "Requests": "请求",
    "Notebook": "笔记",
    "Permanently delete collection": "永久删除收藏",
    "ArtifactDeletionDialog": (session_id, artifacts, total_bytes, total_rows)=>
    <>
      我打算永久删除我的艺术收藏。
      <b>{session_id}</b>.
      <br/>
      收藏的工件： <b className="wrapped-text">
         {artifacts}
      </b>
      <br/><br/>

      { total_bytes.toFixed(0) } Mb数据{ total_rows }行被删除。
    </>,
    "Save this collection to your Favorites": "收藏这个收藏品",
    "ArtifactFavorites": artifacts=>
    <>
      今后，可以很容易地从收藏夹中收集到同样的收藏品。
      <br/>
      这个集合的工件: <b>{artifacts}</b>
      <br/><br/>
    </>,
    "New Favorite name": "新收藏的名字",
    "Describe this favorite": "设置收藏夹",
    "New Collection": "收集",
    "Add to hunt": "添加到 hunt",
    "Delete Artifact Collection": "删除工件收藏",
    "Cancel Artifact Collection": "取消工件收藏",
    "Copy Collection": "复印收藏",
    "Save Collection": "保存收藏",
    "Build offline collector": "创建离线收集器",
    "Notebooks": "笔记",
    "Full Screen": "全屏幕",
    "Delete Notebook": "删除笔记",
    "Notebook Uploads": "笔记上传",
    "Export Notebook": "笔记导出ト",
    "FINISHED": "结束",
    "RUNNING": "运行中",
    "STOPPED": "停止",
    "PAUSED": "暂停",
    "ERROR": "错误",
    "CANCELLED": "被取消",
    "Search for artifacts...": "工件搜索…",
    "Favorite Name": "收藏的名字",
    "Artifact": "工件",
    "No artifacts configured. Please add some artifacts to collect": "没有设置工件。请添加收集的工件。",

    "Artifacts": "工件",
    "Collected Artifacts": "收集的工件",
    "Flow ID": "流 ID",
    "FlowId": "流 ID",
    "Goto notebooks": "打开笔记",
    "Max Mb": "最大Mb",
    "Mb": "Mb",
    "Name": "名字",
    "Ops/Sec": "Ops/Sec",
    "Rows": "行数",
    "New Collection: Select Artifacts to collect":"新收藏:选择要收集的工件",
    "Select Artifacts":"选择工件",
    "Configure Parameters":"设置参数",
    "Specify Resources":"指定资源",
    "Review":"评审",
    "Launch":"启动",
    "New Collection: Configure Parameters":"新集合:设置参数",
    "New Collection: Specify Resources":"新集合:指定资源",
    "New Collection: Review request":"新集合:请求评论",
    "New Collection: Launch collection":"新集合:启动集合",

    "CPU Limit Percent":"CPU极限率",
    "IOps/Sec":"IOps/Sec",
    "Max Execution Time in Seconds":"最大运行时间(秒)",
    "Max Idle Time in Seconds":"最大空闲时间(秒)",
    "If set collection will be terminated after this many seconds with no progress.":"设定的情况下，收集在这些秒数后在什么都没有进行的状态下结束。。",
    "Max Mb Uploaded":"最大可上传 Mb",
    "Collection did not upload files":"集合没有上传文件",

    "Create Offline collector: Select artifacts to collect":"离线:选择要收集的工件",
    "Configure Collection":"集合的设置",
    "Create Offline Collector: Configure artifact parameters":"离线收集器创建:设置工件参数",
    "Create Offline Collector: Review request":"离线收集器创建:回顾请求",
    "Create Offline Collector: Create collector":"离线收集器创建:创建收集器",
    "Create Offline collector:  Configure Collector":"离线收集器创建:设置收集器",
    "Target Operating System":"目标操作系统",
    "Password":"密码",
    "Report Template":"报告模板ト",
    "No Report":"无报告",
    "Collection Type":"收藏类型",
    "Zip Archive":"Zip 存档",
    "Google Cloud Bucket":"谷歌云桶",
    "AWS Bucket":"AWS Bucket",
    "SFTP Upload":"SFTP 上传",
    "Velociraptor Binary":"Velociraptor 二进制",
    "Temp directory":"临时目录",
    "Temp location":"临时位置",
    "Compression Level":"压缩等级",
    "Output format":"输出格式",
    "CSV and JSON":"CSV y JSON",
    "Output Prefix":"输出前缀",
    "Output filename prefix":"输出文件名的前缀",

    "DeleteHuntDialog": <>
                    <p>如果这个收集被停止，收集的数据将被永久删除。</p>
                    <p>ハ要停止收集吗？</p>
                        </>,

    "Started":"开始了",
    "Expires":"有效期",
    "Scheduled":"预定",
    "New Hunt":"新的搜寻",
    "Run Hunt":"开始搜寻",
    "Stop Hunt":"搜寻停止",
    "Delete Hunt":"删除搜寻",
    "Copy Hunt":"复制搜寻",
    "No hunts exist in the system. You can start a new hunt by clicking the New Hunt button above.":"系统内不存在搜寻。点击上面的“新的搜寻”按钮，就可以开始新的搜寻了。",
    "Please select a hunt above":"请从上面选择搜寻。",
    "Clients":"客户端",
    "Notebook for Hunt": hunt_id=>hunt_id + "搜寻的笔记",

    "Hunt ID":"Hunt ID",
    "Creation Time":"创造时间",
    "Expiry Time":"有效期",
    "Total scheduled":"调查客户端数量",
    "Finished clients":"已调查客户端数量",
    "Full Download":"完全下载",
    "Summary Download":"摘要下载",
    "Summary (CSV Only)":"摘要(只有 CSV)",
    "Summary (JSON Only)":"S摘要 (JSON Only)",
    "name":"名字",
    "size":"大小",
    "date":"日期",
    "New Hunt - Configure Hunt":"新搜寻-配置搜寻",
    "Hunt description":"搜寻的描述",
    "Expiry":"有效期限",
    "Include Condition":"条件",
    "Run everywhere":"在全终端上运行",
    "Exclude Condition":"排除条件",
    "Configure Hunt":"搜寻配置",
    "Estimated affected clients":"受影响的客户端估计数目数",
    "All Known Clients":"所有现有客户端",
    "1 Day actives":"一天以上活动",
    "1 Week actives":"一周以上活动",
    "1 Month actives":"1 个月以上活动",
    "Create Hunt: Select artifacts to collect":"搜寻创建:选择要收集的工件",
    "Create Hunt: Configure artifact parameters":"搜寻创建:设置工件参数",
    "Create Hunt: Specify resource limits":"搜寻创建:设定资源限制",
    "Create Hunt: Review request":"搜寻创建:回顾请求",
    "Create Hunt: Launch hunt":"搜寻创建:开始搜寻",

    "ClientId": "客户端 ID",
    "StartedTime":"开始的时间",
    "TotalBytes":"总字节数",
    "TotalRows":"总行数",

    "client_time":"客户端时间",
    "level":"等级",
    "message":"消息",

    "RecursiveVFSMessage": path=><>
       <b>{path}</b>递归式获取所有文件
       <br/><br/>
       这样一来，就有可能从终端传输大量的数据。默认上传上限为 1gb，但你可以在收集到的工件画面上修改。
    </>,

    "Textview":"Text视图",
    "HexView":"Hex视图",
    "Refresh this directory (sync its listing with the client)":"刷新目录(客户端和列表同步)",
    "Recursively refresh this directory (sync its listing with the client)":"递归地刷新目录(与客户端同步列表)",
    "Recursively download this directory from the client":"从客户端递归下载该目录",
    "View Collection":"打开收藏",
    "Size":"大小",
    "Mode":"模式",
    "mtime":"mtime",
    "atime":"atime",
    "ctime":"ctime",
    "btime":"btime",
    "Mtime":"Mtime",
    "Atime":"Atime",
    "Ctime":"Ctime",
    "Btime":"Btime",
    "Properties":"属性",
    "No data available. Refresh directory from client by clicking above.":"没有数据。请点击上面的按钮，从客户端更新目录。。",
    "Please select a file or a folder to see its details here.":"选择文件或文件夹，会显示其详情。",
    "Currently refreshing from the client":"目前正在更新客户端信息",
    "Recursively download files":"递归下载文件",

    "Home":"本地",
    "Hunt Manager":"搜寻管理者",
    "View Artifacts":"浏览工件",
    "Server Events":"服务器事件",
    "Server Artifacts":"服务器工件",
    "Host Information":"主机信息",
    "Virtual Filesystem":"虚拟文件系统",
    "Client Events":"客户端事件",
    "This is a notebook for processing a hunt.":"是用来处理搜寻的笔记。",
    "ToolLocalDesc":
    <>
    工具可以根据需要从 Velociraptor 服务器提供给客户端。
    客户将该工具缓存到自己的磁盘中，然后在下次需要时对哈希进行比较。
    工具只有在哈希值被改变的情况下才会被下载。
    </>,
    "ServedFromURL": (base_path, url)=>
    <>
      客户端可以根据需要直接从<a href={base_path + url}>{url}</a> 获取工具。
      如果哈希值与期望的哈希值不一致，请注意客户会拒绝该文件。
    </>,
    "ServedFromGithub": (github_project, github_asset_regex)=>
    <>
      工具的 URL 将作为项目<b>{github_asset_regex}</b>的最新版本从 github 刷新，该项目与<b>{github_project}</b>匹配。
    </>,
    "PlaceHolder":
    <>
     工具的散列现在还不清楚。
     当你第一次需要工具时， Velociraptor 会从其上游的 URL 下载工具，并计算散列。 
    </>,
    "ToolHash":
    <>
      计算了工具的散列。
      如果客户需要使用这个工具，确保这个哈希值与你要下载的匹配。 
    </>,
    "AdminOverride":
    <>
     工具是管理员手动上传的，下次 Velociraptor 服务器更新时不会自动升级。 
    </>,
    "ToolError":
    <>
      工具的散列不明， URL 也没有定义。
      因为 Velociraptor 无法解决，所以无法在工件中使用这个工具。
      你可以手动上传文件。
    </>,
    "OverrideToolDesc":
    <>
     作为管理员，你可以手动上传作为那个工具使用的二进制文件。
      这将重写上游的 URL 设置，并为所有需要它的工件提供你的工具。 
      另一种方法是设置 URL 以供客户获取工具。
    </>,

    "Include Labels":"包含标签",
    "Exclude Labels":"去除标签",
    "? for suggestions":"推荐: ?",
    "Served from URL":"提供URL",
    "Placeholder Definition":"占位保持器的定义",
    "Materialize Hash":"对散列进行整理",
    "Tool":"工具",
    "Override Tool":"覆盖工具",
    "Select file":"选择文件",
    "Click to upload file":"点击上传文件",
    "Set Serve URL":"设置服务 URL",
    "Served Locally":"本地提供",
    "Tool Hash Known":"现有的哈希工具",
    "Re-Download File":"重新下载文件",
    'Re-Collect from the client': "从客户端重新收集",
    'Collect from the client': '从客户端收集',
    "Tool Name":"工具名",
    "Upstream URL":"上游 URL",
    "Endpoint Filename":"主机的文件名",
    "Hash":"散列",
    "Serve Locally":"本地服务",
    "Serve URL":"服务URL",
    "Fetch from Client": "从客户端获取",
    "Last Collected": "最后的收集",
    "Offset": "偏移",
    "Show All": "显示一切",
    "Recent Hosts": "最近的主机",
    "Download JSON": "下载 JSON",
    "Download CSV": "下载 CSV",
    "Transform Table": "转换表",
    "Transformed": "已改变",

    "Select a notebook from the list above.":"从以上列表中选择笔记。",
    "Cancel":"取消",
    "Recalculate":"再计算",
    "Stop Calculating":"停止计算",
    "Edit Cell":"编辑单元格",
    "Up Cell":"上传单元格",
    "Down Cell":"下载单元格",
    "Add Cell":"添加单元格",
    "Suggestion":"提案",
    "Suggestions":"提案",
    "Add Timeline":"追加时间线",
    "Add Cell From This Cell":"从这个单元格添加单元格",
    "Add Cell From Hunt":"从 搜寻 追加单元",
    "Add Cell From Flow":"从流添加单元",
    "Rendered":"呈现",
    "Undo":"恢复",
    "Delete Cell":"删除单元格",
    "Uptime":"工作时间",
    "BootTime":"启动时间",
    "Procs":"过程",
    "OS":"OS",
    "Platform":"平台",
    "PlatformFamily":"平台家族",
    "PlatformVersion":"平台版本",
    "KernelVersion":"内核版本",
    "VirtualizationSystem":"虚拟系统",
    "VirtualizationRole":"虚拟角色",
    "HostID":"主机 ID",
    "Exe":"EXE",
    "Fqdn":"FQDN",
    "Create a new Notebook":"创造新笔记",
    "Collaborators":"合作者",
    "Submit":"提交",
    "Edit notebook ":"编辑笔记",
    "Notebook uploads":"上传笔记",
    "User Settings":"用户设置",
    "Select a user": "挑选用户",

    "Theme":"主题",
    "Select a theme":"主题选择",
    "Default Velociraptor":"默认迅猛龙",
    "Velociraptor (light)":"迅猛龙(光)",
    "Ncurses (light)":"Ncurses (光)",
    "Velociraptor (dark)":"迅猛龙(暗)",
    "Github dimmed (dark)":"幽暗的 Github(黑暗)",
    "Cool Gray (dark)":"冷灰色(黑暗)",
    "Strawberry Milkshake (light)":"草莓奶昔",
    "Downloads Password":"下载密码",
    "Default password to use for downloads":"下载时使用的默认密码",
     "Create Artifact from VQL":"从 VQL 创建工件",
    "Member":"成员",
    "Response":"响应",
    "Super Timeline":"超级时间线",
    "Super-timeline name":"超级时间线名称",
    "Timeline Name":"时间线名称",
    "Child timeline name":"子时间行名",
    "Time column":"时间序列",
    "Time Column":"时间序列",
    "Language": "语言",
    "Match by label": "标签匹配",
    "All known Clients": "现有客户端",
    "X per second": x=><>{x}毎秒</>,
    "HumanizeDuration": difference=>{
      if (difference<0) {
          return <>
                   In {humanizeDuration(difference, {
                       round: true,
                       language: "ch",
                   })}
                 </>;
      }
      return <>
               {humanizeDuration(difference, {
                   round: true,
                   language: "ch",
               })} 前
             </>;
    },
    "Transform table": "转换表",
    "Sort Column": "列排序",
    "Filter Regex": "用正则表达式过滤",
    "Filter Column": "过滤列",
    "Select label to edit its event monitoring table": "选择标签，编辑该事件监测表",
    "EventMonitoringCard":
    <>
    事件监测以特定的标签组为对象。
    选择上面的标签组，你就可以设置针对该组的特定事件工件。
    </>,
    "Event Monitoring: Configure Label groups": "事件监视:标签组的设置",
    "Configuring Label": "标签设置",
    "Event Monitoring Label Groups": "事件监视的标签组",
    "Event Monitoring: Select artifacts to collect from label group ": "事件监视:从标签组中选 择要收集的工件",
    "Artifact Collected": "收集的工件",
    "Event Monitoring: Configure artifact parameters for label group ": "事件监视:设置标签组的工件参数 ",
    "Event Monitoring: Review new event tables": "事件监测:回顾新事件表",

    "Server Event Monitoring: Select artifacts to collect on the server":"服务器事件监视:选择 要在服务器上收集的工件",
    "Server Event Monitoring: Configure artifact parameters for server":"服务器事件监测:设置服务 器的工件参数",
    "Server Event Monitoring: Review new event tables":"服务器事件监测:回顾新事件",
    "Configure Label Group":"设置等级组",
    "Select artifact": "选择工件",

    "Raw Data":"原始数据",
    "Logs":"日志",
    "Log":"日志",
    "Report":"报告",

    "NotebookId":"笔记ID",
    "Modified Time":"变更时间",
    "Time": "时间",
    "No events": "没有事件",
    "_ts": "服务器时间",

    "Timestamp":"时间戳",
    "started":"开始了",
    "vfs_path":"VFS路径",
    "file_size":"文件大小",
    "uploaded_size":"上传大小",
    "TablePagination": (from, to, size)=>
    <>以{ size }单位从{ from }到{ to }显示的</>,

    "Select a language":"选择语言",
    "Chinese" :"汉语",
    "English":"英語",

    "Type":"类型",
    "Export notebooks":"笔记的导出",
    "Export to HTML":"HTML的导出",
    "Export to Zip":"Zip的输出",

    "Permanently delete Notebook":"永久删除笔记",
    "You are about to permanently delete the notebook for this hunt":"我打算永久删除这个搜寻的笔记。",

    "Data":"数据",
    "Served from GitHub":"由 GitHub 提供",
    "Refresh Github":"刷新 Github",
    "Github Project":"GGithub 项目",
    "Github Asset Regex":"Github 资产正则表达式",
    "Admin Override":"管理员重写",
    "Serve from upstream":"从上游提供",

    "Update server monitoring table":"更新服务器监控表",
    "Show server monitoring tables":"服务器监视表的显示",

    "Display timezone": "时区的显示",
    "Select a timezone": "时区的选择",

    "Update client monitoring table":"客户端监控表更新",
    "Show client monitoring tables":"显示客户端监视表",
    "Urgent": "急",
    "Skip queues and run query urgently": "跳过队列紧急执行查询",

    // Below need verification
    "Role_administrator" : "服务器管理员",
     "Role_org_admin" : "组织管理者",
     "Role_reader" : "只读用户",
     "Role_analyst" : "分析师",
     "Role_investigator" : "捜査官",
     "Role_artifact_writer" : "工件作者",
     "Role_api" : "只读 api 客户端",

    "Perm_ALL_QUERY": "所有查询",
     "Perm_ANY_QUERY": "任意查询",
     "Perm_PUBISH": "公开",
     "Perm_READ_RESULTS": "结果读取",
     "Perm_LABEL_CLIENT": "客户端标签",
     "Perm_COLLECT_CLIENT": "客户端收集",
     "Perm_START_HUNT": "开始搜寻",
     "Perm_COLLECT_SERVER": "收集服务器",
     "Perm_ARTIFACT_WRITER": "工件作者",
     "Perm_SERVER_ARTIFACT_WRITER": "服务器工件作者",
     "Perm_EXECVE" : "EXECVE",
     "Perm_NOTEBOOK_EDITOR": "笔记编辑器",
     "Perm_SERVER_ADMIN": "服务器管理员",
     "Perm_ORG_ADMIN": "组织管理者",
     "Perm_IMPERSONATION": "伪装",
     "Perm_FILESYSTEM_READ": "读取文件系统",
     "Perm_FILESYSTEM_WRITE": "文件系统写入",
     "Perm_MACHINE_STATE": "机器状态",
     "Perm_PREPARE_RESULTS": "准备结果",
     "Perm_DATASTORE_ACCESS": "数据存储访问",


     "ToolPerm_ALL_QUERY": "无限发布所有查询",
     "ToolPerm_ANY_QUERY": "发布所有查询(AllQuery 表示 AnyQuery)",
     "ToolPerm_PUBISH": "发布事件到服务器端队列(通常不需要)",
     "ToolPerm_READ_RESULTS": "从已执行的猎、流或笔记本读取结果",
     "ToolPerm_LABEL_CLIENT": "可以操作客户端标签和元数据",
     "ToolPerm_COLLECT_CLIENT": "客户端新收藏的日程或取消",
     "ToolPerm_START_HUNT": "开始新的搜寻",
     "ToolPerm_COLLECT_SERVER": "迅猛龙服务器调度新的工件收集",
     "ToolPerm_ARTIFACT_WRITER": "添加或编辑在服务器上运行的自定义工件",
     "ToolPerm_SERVER_ARTIFACT_WRITER": "添加或编辑在服务器上运行的自定义工件",
     "ToolPerm_EXECVE": "允许客户端执行任何命令",
     "ToolPerm_NOTEBOOK_EDITOR": "允许修改笔记和单元格",
     "ToolPerm_SERVER_ADMIN": "允许管理服务器配置",
     "ToolPerm_ORG_ADMIN": "组织的管理许可",
     "ToolPerm_IMPERSONATION": "允许用户在 query()插件中指定另一个用户名",
     "ToolPerm_FILESYSTEM_READ": "可以从文件系统读取任何文件",
     "ToolPerm_FILESYSTEM_WRITE": "允许在文件系统中创建文件",
     "ToolPerm_MACHINE_STATE": "允许从机器收集状态信息(例如:pslist())",
     "ToolPerm_PREPARE_RESULTS": "允许创建 zip 文件",
     "ToolPerm_DATASTORE_ACCESS": "允许访问原始数据存储",
};

_.each(automated, (v, k)=>{
    Chinese[hex2a(k)] = v;
});

export default Chinese;