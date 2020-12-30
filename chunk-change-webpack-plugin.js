const pluginName = 'chunkChangeWebpackPlugin';

class ChunkChangeWebpackPlugin {

    // 实例化时传入参数
    constructor(options, doneCallback, failCallback){
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }
    apply(compiler) {
        compiler.plugin('compilation', compilation => {
            console.log('------------, compilation')
        })
        compiler.plugin('watch-run', (watching, callback) => {
            console.log("wetching ------ ", watching.compiler)

            callback();
        });
        compiler.plugin('done', ()=> {
            console.log("done")
        })
        compiler.plugin('failed', (error)=> {
            this.failCallback(error)
        })
    }
}

module.exports = ChunkChangeWebpackPlugin;