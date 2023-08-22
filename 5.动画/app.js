import initShaders from '../initShaders.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec2 a_position;
uniform vec4 u_translate;

void main() {
    gl_Position = vec4(a_position,0.0,1.0)+u_translate;
    gl_PointSize = 10.0;
}
`

/**
 * 变换 ：平移translate，旋转rotate，缩放scale
 * @type {string}
 */

const fragmentShader = `
void main() {
    gl_FragColor = vec4(0.0,1.0,1.0,1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

function initVertexBuffer(gl) {
    // 顶点数据
    const vertices = new Float32Array([
        -0.6, -0.6,
        0.6, -0.6,
        0.0, 0.6,
    ])
    const F_SIZE = vertices.BYTES_PER_ELEMENT
    /**
     * 创建buffer分5步
     */
        // 1
    const buffer = gl.createBuffer();
    // 2
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    // 3
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    // 4 把带有数据的buffer赋值到attribute
    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(
        a_position,         // location：vertexShader里面的attribute变量的location
        2,             // size：attribute变量的长度(vec2)  (attribute vec2 a_position;)
        gl.FLOAT,           // type:buffer里面数据的类型
        false,   //  normalized：正交化 整数数值归一化
        2 * F_SIZE,    //  stride：没个点的信息所占的bytes
        0,   //  offset：每个点的信息 是从第几个bytes开始数
    );

    // 5 确认把带有数据的buffer赋值到attribute
    gl.enableVertexAttribArray(a_position)
}

initVertexBuffer(gl);

function draw() {
    // 清空canvas画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 画图
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

let tx = 0.0, ty = 0.0;
let speed_x = 0.01, speed_y = 0.02;

function tick() {
    tx += speed_x;
    ty += speed_y;
    if (tx > 0.4 || tx < -0.4) speed_x *= -1;
    if (ty > 0.4 || ty < -0.4) speed_y *= -1;
    const u_translate = gl.getUniformLocation(gl.program, 'u_translate');
    gl.uniform4f(u_translate, tx, ty, 0.0, 0.0)
    draw();
    requestAnimationFrame(tick)
}

tick();
