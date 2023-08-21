const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

// vertexShader fragmentShader
const vertexSourec = `
void main(){
    gl_Position = vec4(0.5,0.0,0.0,1.0);
    gl_PointSize = 10.0;
}
`;
const fragmentSource = `
void main(){
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`;

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

// 绑定
gl.shaderSource(vertexShader, vertexSourec)
gl.shaderSource(fragmentShader, fragmentSource)

// 编译
gl.compileShader(vertexShader);
gl.compileShader(fragmentShader)

// program
const program = gl.createProgram();
// attachShader方法不需要区分顶点还是片元，方法自己内部判断
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
// 指定绑定哪个程序
gl.linkProgram(program)
// 指定使用哪个程序
gl.useProgram(program)

// 清空canvas画布
gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 画一个点
gl.drawArrays(gl.POINTS, 0, 1)