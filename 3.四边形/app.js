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
    gl_PointSize = 10.0;
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
gl.clearColor(0.5, 0.5, 0.5, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 随机生成n个点
const n = 6;
const verticesData = []
for (let i = 0; i < n; i++) {
    let x = ((Math.random())-0.5)*2;
    let y = ((Math.random())-0.5)*2;
    let r = ((Math.random())-0.5)*2;
    let g = ((Math.random())-0.5)*2;
    let b = ((Math.random())-0.5)*2;
    verticesData.push(x,y,r,g,b)
}
const vertices = new Float32Array(verticesData);
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
    5 * F_SIZE,    //  stride：每个点的信息所占的bytes
    0,   //  offset：每个点的信息 是从第几个bytes开始数
);

const a_color = gl.getAttribLocation(gl.program, 'a_color');
gl.vertexAttribPointer(
    a_color,
    3,
    gl.FLOAT,
    false,
    5 * F_SIZE,
    2* F_SIZE,
)
// 5 确认把带有数据的buffer赋值到attribute
gl.enableVertexAttribArray(a_position)
gl.enableVertexAttribArray(a_color)

/**
 * webgl基本形状   点、线、三角形
 * 衍生：
 *      点：1种 POINTS
 *      线；3种 LINES（线段）、LINE_STRIP（线条连接不闭口）、LINE_LOOP（闭口线条）
 *      三角形：3种 TRIANGLE_STRIP（三角带）、TRIANGLE_FAN（三角扇）、TRIANGLE（三角形）
 */

gl.drawArrays(gl.LINES, 0, n)
