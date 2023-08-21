/**
 * 初始化
 * @param gl gl实例
 * @param vertexSource 顶点着色器源码
 * @param fragmentSource 片元着色器源码
 * @returns {boolean}
 */
export default function initShaders(gl, vertexSource, fragmentSource) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    if(program){
        // 指定使用哪个程序
        gl.useProgram(program);
        // 把program挂在全局gl上，方便后续使用
        gl.program = program;
        return true
    }
    console.error('Failed to create program')
    return false
}

/**
 * 创建着色器（顶点着色器、片元着色器）
 * @param gl gl实例
 * @param type 类型 gl.VERTEX_SHADER/gl.FRAGMENT_SHADER
 * @param source glsl代码
 * @returns {WebGLShader|null}
 */
function createShader(gl, type, source) {
    // 创建着色器
    const shader = gl.createShader(type);
    // 绑定
    gl.shaderSource(shader, source);
    // 编译
    gl.compileShader(shader)
    // 编译Shader的信息捕获
    const compile = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    if (compile) {
        return shader
    }
    console.log('compile shader error----' + gl.getShaderInfoLog(shader));
    // 删除容器防止内存泄漏
    gl.deleteShader(shader);
    return null
}

/**
 * 创建程序
 * @param gl gl实例
 * @param vertexShader 顶点着色器
 * @param fragmentShader 片元着色器
 * @returns {null|WebGLProgram}
 */
function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    if (!program) return null;
    // attachShader方法不需要区分顶点还是片元，方法自己内部判断
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 指定绑定哪个程序
    gl.linkProgram(program);
    const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linked) {
        return program;
    }
    console.log('link program error----' + gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return null;
}
