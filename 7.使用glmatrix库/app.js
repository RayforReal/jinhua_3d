import initShaders from '../initShaders.js';
import { mat4, vec3 } from '../gl_matrix/esm/index.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec2 a_position;
uniform mat4 u_matrix;

void main() {
    gl_Position = u_matrix * vec4(a_position,0.0,1.0);
}
`

const fragmentShader = `
precision mediump float;

void main() {
    gl_FragColor = vec4(0.0,1.0,0.0,1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)

// 顶点数据
const vertices = new Float32Array([
    -0.5, 0.0,
    0.5, 0.0,
    0.0, 0.5,
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

// 创建矩阵
const u_matrix = gl.getUniformLocation(gl.program, 'u_matrix');

/**
 * 缩放矩阵
 */
// const scale_matrix = mat4.create();
// mat4.fromScaling(scale_matrix,[0.5,0.5,0.5])
// gl.uniformMatrix4fv(u_matrix, false, scale_matrix)

/**
 * 平移矩阵
 */
// const translate_matrix = mat4.create();
// mat4.fromTranslation(translate_matrix,[-0.5,0,0])
// gl.uniformMatrix4fv(u_matrix, false, translate_matrix)

/**
 * 旋转矩阵
 */
const rotate_matrix = mat4.create();

const tick = () => {
    mat4.rotate(rotate_matrix,rotate_matrix,5 / 180 * Math.PI, [0, 0, 1])
    gl.uniformMatrix4fv(u_matrix, false, rotate_matrix)
    // 清空canvas画布
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(tick)
}
tick()


/**
 * 变换：平移translate、旋转rotate、缩放scale
 * 矩阵*向量=向量
 * webgl的矩阵与数学矩阵需要颠倒（转置）
 * 现象表现为平移矩阵和旋转矩阵在传入webgl时需要行列颠倒
 * 缩放矩阵颠倒前后一致
 */

// ***** 平移矩阵 ******
// [
//     1, 0, 0, Tx,
//     0, 1, 0, Ty,
//     0, 0, 1, Tz,
//     0, 0, 0, 1,
// ]

// ****** 旋转矩阵 ******
// [
//     cosB, -sinB, 0, 0,
//     sinB, cosB,  0, 0,
//     0,    0,     1, 0,
//     0,    0,     0, 1,
// ]

// ****** 缩放矩阵 ******
// [
//     Sx, 0,  0,  0,
//     0,  Sy, 0,  0,
//     0,  0,  Sz, 0,
//     0,  0,  0,  1,
// ]
