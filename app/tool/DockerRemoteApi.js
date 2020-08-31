// http://axios-js.com/zh-cn/docs/index.html
const axios = require('axios')
/*
Docker Engine API的JS库。它可以让您执行docker命令所要做的任何事情，但是可以在Python应用程序中执行–运行容器，管理容器，管理Swarms等。
使用:

const docker = new Docker('http://192.168.3.86:2375')

----------函数访问
docker.containersList().then(data=>{
    console.log(data);
})

----------地址访问
docker.getDockerApi('/containers/json').then(data=>{
    console.log(data);
})
*/
const EmptyPropertyException = (propertyName) => {
    throw Error(`${propertyName} 为必填参数`)
}


const Docker = class {
    constructor(docker_remote_api_url, url) { //constructor是一个构造方法，用来接收参数
        this.docker_remote_api_url = docker_remote_api_url;  //this代表的是实例对象
        this.url = url;  //this代表的是实例对象
    }

    /*
    ----------
    地址访问 GET

     */
    async getDockerApi(url, data) {
        try {
            axios.defaults.baseURL = this.docker_remote_api_url
            let res = await axios.get(url, {params: {...data}})
            // console.log(res.request);
            return new Promise((resolve) => {
                resolve({status: res.status, data: res.data})
            })
        } catch (err) {
            console.log('完整错误信息=>', err)
            console.log('服务器返回的信息=>', err.response.data.message)
            console.log('服务器返回的状态=>', err.response.status)
        }
    }

    /*
    ----------
    地址访问 POST

     */
    async postDockerApi(url, data) {
        try {
            axios.defaults.baseURL = this.docker_remote_api_url
            axios.defaults.headers = {'Content-Type': 'application/json; charset=utf-8'}
            let res = await axios.post(url, {...data})
            // console.log(res);
            return new Promise((resolve) => {
                resolve({status: res.status, data: res.data})
            })
        } catch (err) {
            console.log('完整错误信息=>', err)
            console.log('服务器返回的信息=>', err.response.data.message)
            console.log('服务器返回的状态=>', err.response.status)
            console.log('请求提供的配置信息=>', err.response.config)
        }
    }

    /*========== 容器 ==========*/

    /*
    ----------
    列出容器

    返回容器列表,默认返回全部容器列表。有关格式的详细信息，请参见 检查端点。
    请注意，与检查单个容器相比，它使用了不同的较小的容器表示形式。例如，不传播链接容器的列表

     */
    async containersList(params = {}) {
        const data = {
            all: params.all || true,//返回所有容器。传false，仅显示正在运行的容器。
            limit: params.limit,//返回此数量的最近创建的容器，包括未运行的容器
            size: params.size,//返回容器的大小作为字段SizeRw和SizeRootFs
            filters: params.filters,/*
                    过滤以对容器列表进行处理，编码为JSON（a map[string][]string）。例如，{"status": ["paused"]}将仅返回已暂停的容器。
                    可用的过滤器：
                    ancestor=（ ，<image-name>[:<tag>]，<image id>或<image@digest>）
                    before=（<container id>或<container name>）
                    expose=（<port>[/<proto>]| <startport-endport>/[<proto>]）
                    exited=<int> 出口代码为的容器 <int>
                    health=（starting| healthy| unhealthy| none）
                    id=<ID> 容器的ID
                    isolation=（default| process| hyperv）（仅Windows守护程序）
                    is-task=（true| false）
                    label=key或label="key=value"容器标签的
                    name=<name> 容器的名称
                    network=（<network id>或<network name>）
                    publish=（<port>[/<proto>]| <startport-endport>/[<proto>]）
                    since=（<container id>或<container name>）
                    status=（created| restarting| running| removing| paused| exited| dead）
                    volume=（<volume name>或<mount point destination>）*/
        }
        return await this.getDockerApi('/containers/json', data)
    }

    /*
    ----------
    新建容器

    返回容器列表。有关格式的详细信息，请参见:https://s0docs0docker0com.icopy.site/engine/api/v1.40/#operation/ContainerInspect。
    请注意，与检查单个容器相比，它使用了不同的较小的容器表示形式。例如，不传播链接容器的列表

     */
    async containersCreate(params = {}) {

        const data = {
            Hostname: params.Hostname,//用于容器的主机名，作为有效的RFC 1123主机名。
            Domainname: params.Domainname,//容器使用的域名。
            User: params.User,//在容器内运行命令的用户。
            AttachStdin: params.AttachStdin,//是否附加stdin
            AttachStdout: params.AttachStdout,//是否附加stdout
            AttachStderr: params.AttachStderr,//是否附加stderr。
            ExposedPorts: params.ExposedPorts,//暴露端口,对象将端口映射为以下形式的空对象：{"<port>/<tcp|udp|sctp>": {}}
            Tty: params.Tty,//将标准流附加到TTY，包括stdin未关闭的情况
            OpenStdin: params.OpenStdin,//打开 stdin
            StdinOnce: params.StdinOnce,//stdin一个连接的客户端断开连接后关闭
            Env: params.Env,//以表格形式在容器内设置的环境变量列表["VAR=value", ...]。=从环境中删除没有的变量，而不是具有空值。
            Cmd: params.Cmd,//以指定的字符串或字符串数​​组形式运行的命令。
            Healthcheck: params.Healthcheck,//进行检查容器是否健康的测试。
            ArgsEscaped: params.ArgsEscaped,//命令已被转义（仅Windows）
            Image: params.Image || EmptyPropertyException('Image'),//创建容器/时要使用的图片名称
            Volumes: params.Volumes,//对象将容器内的安装点路径映射到空对象。
            WorkingDir: params.WorkingDir,//运行命令的工作目录。
            Entrypoint: params.Entrypoint,//容器的入口点，是字符串或字符串数​​组。如果数组仅由一个空字符串（[""]）组成，则入口点将重置为系统默认值（即，当docker中没有ENTRYPOINT指令时，docker使用的入口点Dockerfile）。
            NetworkDisabled: params.NetworkDisabled,//禁用容器的联网。
            MacAddress: params.MacAddress,//容器的MAC地址。
            OnBuild: params.OnBuild,//ONBUILD图片的中定义的元数据Dockerfile。
            Labels: params.Labels,//标签,用户定义的键/值元数据。
            StopSignal: params.StopSignal,//信号以字符串或无符号整数形式停止容器。
            StopTimeout: params.StopTimeout,//停止容器的超时时间（以秒为单位）。
            Shell: params.Shell,//在RUN，时使用Shell CMD，并ENTRYPOINT使用Shell。
            HostConfig: params.HostConfig,//容器配置取决于我们运行的主机
            NetworkingConfig: params.NetworkingConfig//NetworkingConfig代表容器每个接口的网络配置。它用于docker create 和docker network connect命令中指定的网络配置。
        }
        return await this.postDockerApi('/containers/create?name=' + params.name, data)
    }

    /*
    ----------
    查找容器

    返回有关容器的底层信息。

     */
    async containersInspect(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            size: params.size,// boolean 返回容器的大小作为字段SizeRw和SizeRootFs
        }
        return await this.getDockerApi('/containers/' + data.id + '/json', data)
    }

    /*
    ----------
    列出容器中运行的进程

    在Unix系统上，这是通过运行ps命令来完成的。Windows不支持此端点。

     */
    async containersRunningList(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            ps_args: params.ps_args,// string 要传递给的参数ps。例如，aux
        }
        return await this.getDockerApi('/containers/' + data.id + '/top', data)
    }

    /*
    ----------
    获取容器日志

    从容器获取stdout并stderr记录日志。
    注意：此端点仅适用于带有json-file或 journald日志记录驱动程序的容器。

     */
    async containersGetLogs(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
        }
        return await this.getDockerApi('/containers/' + data.id + '/logs')
    }

    /*
    ----------
    获取容器文件系统上的更改

    返回容器的文件系统中已添加，删除或修改的文件。所述Kind修饰可以是以下之一：
    0：修改
    1： 添加
    2：已删除

     */
    async containersChanges(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
        }
        return await this.getDockerApi('/containers/' + data.id + '/changes')
    }

    /*
    ----------
    导出容器

    将容器的内容导出为tarball。

     */
    async containersExport(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
        }
        return await this.getDockerApi('/containers/' + data.id + '/export')
    }

    /*
    ----------
    根据资源使用情况获取容器统计信息

    该端点返回容器资源使用情况统计信息的实时流。
    该precpu_stats是的CPU统计以前的读取，并用来计算CPU使用率。它不是该cpu_stats字段的精确副本。
    如果precpu_stats.online_cpus或cpu_stats.online_cpus为nil，则为了与较早的守护程序兼容，cpu_usage.percpu_usage应使用相应数组的长度。
    要计算statsdocker cli工具命令显示的值，可以使用以下公式：
        used_memory = memory_stats.usage - memory_stats.stats.cache
        available_memory = memory_stats.limit
        内存使用率％= (used_memory / available_memory) * 100.0
        cpu_delta = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage
        system_cpu_delta = cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage
        number_cpus = lenght(cpu_stats.cpu_usage.percpu_usage)或cpu_stats.online_cpus
        CPU使用率％= (cpu_delta / system_cpu_delta) * number_cpus * 100.0

     */
    async containersExport(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            stream: params.stream,// boolean 流输出。如果为false，则统计信息将被输出一次，然后将断开连接。
        }
        return await this.getDockerApi('/containers/' + data.id + '/stats', data)
    }

    /*
    ----------
    启动一个容器

    返回容器列表。有关格式的详细信息，请参见:https://s0docs0docker0com.icopy.site/engine/api/v1.40/#operation/ContainerInspect。
    请注意，与检查单个容器相比，它使用了不同的较小的容器表示形式。例如，不传播链接容器的列表

     */
    async containersStart(params = {}) {

        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            detachKeys: params.detachKeys,// string 覆盖用于分离容器的键序列。格式是一个单独的字符[a-Z]或ctrl-<value>其中<value>是下列之一：a-z，@，^，[，,或_。
        }
        return await this.postDockerApi('/containers/' + data.id + '/start', data)
    }

    /*
    ----------
    停止容器

     */
    async containersStop(params = {}) {

        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            t: params.t,// integer 杀死容器之前要等待的秒数
        }
        return await this.postDockerApi('/containers/' + data.id + '/stop', data)
    }

    /*
    ----------
    重新启动容器

     */
    async containersRestart(params = {}) {

        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            t: params.t,// integer 杀死容器之前要等待的秒数
        }
        return await this.postDockerApi('/containers/' + data.id + '/restart', data)
    }

    /*
    ----------
    杀死一个容器

    向容器发送POSIX信号，默认情况下会杀死该容器。

     */
    async containersKill(params = {}) {

        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            signal: params.signal,// string 信号以整数或字符串的形式发送到容器（例如SIGINT）
        }
        return await this.postDockerApi('/containers/' + data.id + '/kill', data)
    }

    /*
    ----------
    更新容器

    更改容器的各种配置选项，而无需重新创建。

     */
    async containersUpdate(params = {}) {

        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            CpuShares: params.CpuShares,// integer 一个整数值，表示此容器相对于其他容器的相对CPU重量。
            Memory: params.Memory,// integer 内存限制（以字节为单位）。
            CgroupParent: params.CgroupParent,// string cgroups在其下cgroup创建容器的路径。如果该路径不是绝对路径，则该路径被视为相对于cgroups初始化进程的 路径。如果Cgroup不存在，则会创建它们。
            BlkioWeight: params.BlkioWeight,// integer 块IO权重（相对权重）。
            BlkioWeightDevice: params.BlkioWeightDevice,// array 块IO权重（相对设备权重）的形式为：[{"Path": "device_path", "Weight": weight}]
            BlkioDeviceReadBps: params.BlkioDeviceReadBps,// array 限制从设备读取的速率（每秒字节数），格式为：[{"Path": "device_path", "Rate": rate}]
            BlkioDeviceWriteBps: params.BlkioDeviceWriteBps,// array 限制对设备的写入速率（每秒字节数），格式为：[{"Path": "device_path", "Rate": rate}]
            BlkioDeviceReadIOps: params.BlkioDeviceReadIOps,// array 限制从设备读取的速率（每秒的IO），格式为：[{"Path": "device_path", "Rate": rate}]
            BlkioDeviceWriteIOps: params.BlkioDeviceWriteIOps,// array 限制对设备的写入速率（每秒的IO），格式为：[{"Path": "device_path", "Rate": rate}]
            CpuPeriod: params.CpuPeriod,// integer CPU周期的长度（以微秒为单位）。
            CpuQuota: params.CpuQuota,// integer 容器在CPU周期内可以获得的微秒CPU时间。
            CpuRealtimePeriod: params.CpuRealtimePeriod,// integer CPU实时周期的长度（以微秒为单位）。设置为0将不分配任何时间分配给实时任务。
            CpuRealtimeRuntime: params.CpuRealtimeRuntime,// integer CPU实时运行时的长度（以微秒为单位）。设置为0将不分配任何时间分配给实时任务。
            CpusetCpus: params.CpusetCpus,// string 允许执行的CPU（例如0-3，0,1）。
            CpusetMems: params.CpusetMems,// string 允许执行的内存节点（MEM）（0-3，0,1）。仅在NUMA系统上有效。
            Devices: params.Devices,// array 要添加到容器的设备列表。
            DeviceCgroupRules: params.DeviceCgroupRules,// array 应用于容器的cgroup规则列表
            DeviceRequests: params.DeviceRequests,// array 将设备发送到设备驱动程序的请求列表。
            KernelMemory: params.KernelMemory,// integer 内核内存限制（以字节为单位）。
            KernelMemoryTCP: params.KernelMemoryTCP,// integer 内核TCP缓冲存储器的硬限制（以字节为单位）。
            MemoryReservation: params.MemoryReservation,// integer 内存软限制，以字节为单位。
            MemorySwap: params.MemorySwap,// integer 总内存限制（内存+交换）。设置为-1启用无限交换。
            MemorySwappiness: params.MemorySwappiness,// integer 调整容器的内存交换行为。接受0到100之间的整数。
            NanoCPUs: params.NanoCPUs,// integer CPU配额，以10 -9个 CPU 为单位。
            OomKillDisable: params.OomKillDisable,// 布尔值 禁用容器的OOM Killer。
            Init: params.Init,// 布尔值 在容器内运行一个初始化程序，以转发信号并获取进程。如果为空，则忽略此字段，并使用默认值（在守护程序上配置）。
            PidsLimit: params.PidsLimit,// integer 调整容器的PID限制。设置0或-1为无限，或null 不更改。
            Ulimits: params.Ulimits,// array 容器中要设置的资源限制列表。例如：{"Name": "nofile", "Soft": 1024, "Hard": 2048}
            CpuCount: params.CpuCount,// integer 可用的CPU数量（仅Windows）。在Windows Server容器上，处理器资源控件是互斥的。优先顺序是CPUCount第一个，然后 CPUShares是和CPUPercent最后一个。
            CpuPercent: params.CpuPercent,// integer 可用CPU的可用百分比（仅Windows）。在Windows Server容器上，处理器资源控件是互斥的。优先顺序是CPUCount第一个，然后 CPUShares是和CPUPercent最后一个。
            IOMaximumIOps: params.IOMaximumIOps,// integer 容器系统驱动器的最大IOps（仅Windows）
            IOMaximumBandwidth: params.IOMaximumBandwidth,// integer 容器系统驱动器的最大IO（以字节/秒为单位）（仅Windows）。
            RestartPolicy: params.RestartPolicy,// RestartPolicy 容器退出时要应用的行为。默认为不重新启动。每次重新启动之前，都会添加一个不断增加的延迟（从100ms开始，是以前的延迟的两倍），以防止服务器泛滥。
        }
        return await this.postDockerApi('/containers/' + data.id + '/update', data)
    }

    /*
    ----------
    重命名容器

     */
    async containersRename(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
            name: params.name,// string 容器的新名称
        }
        return await this.postDockerApi('/containers/' + data.id + '/rename', data)
    }

    /*
    ----------
    暂停容器

    使用冰箱cgroup挂起容器中的所有进程。
    传统上，在挂起进程时SIGSTOP会使用信号，这可以通过挂起进程来观察。使用冷冻机cgroup时，该过程不知道并且无法捕获，该过程已被挂起，随后又恢复。

     */
    async containersPause(params = {}) {
        const data = {
            id: params.id || EmptyPropertyException('id'),// string 容器的ID或名称
        }
        return await this.postDockerApi('/containers/' + data.id + '/pause')
    }

}


const docker = new Docker('http://192.168.1.7:2375')
docker.containersList().then(data => {
    data.data.forEach((item) => {
console.log(item);
    })
})

docker.containersStart({id: '8682c0ac4b07037fca561e51d5890c781b61050990d79cf8d47b61260b2f4f74'}).then(data => {
    console.log(data);
})

// docker.containersInspect({id: 'jiujian'}).then(data => {
//     console.log(data);
// })

// docker.containersRunningList({id: 'jiujian'}).then(data => {
//     console.log(data);
// })

// docker.containersCreate({Image: 'ubuntu'}).then(data => {
//     console.log(data);
// })
module.exports.Docker = Docker





