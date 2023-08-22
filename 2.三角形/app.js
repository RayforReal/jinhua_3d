import initShaders from '../initShaders.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec2 a_position;
attribute vec3 a_color;
varying vec3 v_color;

void main() {
    v_color = a_color;
    gl_Position = vec4(a_position,0.0,1.0);
    gl_PointSize = 20.0;
}
`

const fragmentShader = `
precision mediump float;
varying vec3 v_color;

void main() {
    gl_FragColor = vec4(v_color,1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

// 清空canvas画布
gl.clearColor(0.0, 0.0, 0.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 顶点数据
const vertices = new Float32Array([
    // x   y    r    g    b
    -0.5, 0.0, 1.0, 0.0, 0.0, //第一个点信息
    0.5, 0.0, 0.0, 1.0, 0.0, //第二个点信息
    0.0, 0.8, 0.0, 0.0, 1.0, //第三个点信息
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
    5 * F_SIZE,    //  stride：没个点的信息所占的bytes
    0,   //  offset：每个点的信息 是从第几个bytes开始数
);
const a_color = gl.getAttribLocation(gl.program, 'a_color');
gl.vertexAttribPointer(
    a_color,
    3,
    gl.FLOAT,
    false,
    5 * F_SIZE,
    2 * F_SIZE,
);

// 5 确认把带有数据的buffer赋值到attribute
gl.enableVertexAttribArray(a_position)
gl.enableVertexAttribArray(a_color)

// 回执三角形
gl.drawArrays(gl.TRIANGLES, 0, 3)

