import initShaders from "../initShaders.js";
import { mat4, glMatrix } from '../gl_matrix/esm/index.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec3 a_position;
attribute vec3 a_color;
varying vec3 v_color;
uniform mat4 a_rMatrix;

void main(){
    v_color=a_color;
    gl_Position = a_rMatrix * vec4(a_position,1.0);
}
`;
const fragmentShader = `
precision mediump float;
varying vec3 v_color;

void main(){
    gl_FragColor = vec4(v_color,1.0);
}
`;

initShaders(gl, vertexShader, fragmentShader)
initVertexBuffers();
makeMatrix();
draw();

function makeMatrix() {
    const rMatrix = mat4.create();
    mat4.fromRotation(rMatrix, glMatrix.toRadian(30), [1, 1, 0]);
    const a_rMatrix = gl.getUniformLocation(gl.program, 'a_rMatrix');
    gl.uniformMatrix4fv(a_rMatrix, false, rMatrix)
}

function initVertexBuffers() {
    /**
     *
     *          v5 -------- v6
     *         / |          /|
     *        /  |         / |
     *      v1 -------- v2   |
     *      |    |       |   |
     *      |  v8|-------|-- v7
     *      |   /        |  /
     *      v4 -------- v3
     *
     *
     */
    const v1 = [-0.5, 0.5, 0.5];
    const v2 = [0.5, 0.5, 0.5];
    const v3 = [0.5, -0.5, 0.5];
    const v4 = [-0.5, -0.5, 0.5];
    const v5 = [-0.5, 0.5, -0.5];
    const v6 = [0.5, 0.5, -0.5];
    const v7 = [0.5, -0.5, -0.5];
    const v8 = [-0.5, -0.5, -0.5];

    const vertexes = new Float32Array([
        //前
        ...v1, 1.0, 0.0, 0.0,
        ...v2, 1.0, 0.0, 0.0,
        ...v3, 1.0, 0.0, 0.0,
        ...v4, 1.0, 0.0, 0.0,
        //后
        ...v5, 0.0, 1.0, 0.0,
        ...v6, 0.0, 1.0, 0.0,
        ...v7, 0.0, 1.0, 0.0,
        ...v8, 0.0, 1.0, 0.0,
        //左
        ...v1, 0.0, 0.0, 1.0,
        ...v5, 0.0, 0.0, 1.0,
        ...v4, 0.0, 0.0, 1.0,
        ...v8, 0.0, 0.0, 1.0,
        //右
        ...v2, 0.0, 0.2, 0.2,
        ...v3, 0.0, 0.2, 0.2,
        ...v7, 0.0, 0.2, 0.2,
        ...v6, 0.0, 0.2, 0.2,
        //上
        ...v1, 0.2, 0.0, 0.5,
        ...v2, 0.2, 0.0, 0.5,
        ...v6, 0.2, 0.0, 0.5,
        ...v5, 0.2, 0.0, 0.5,
        //下
        ...v3, 0.2, 0.0, 0.5,
        ...v4, 0.2, 0.0, 0.5,
        ...v8, 0.2, 0.0, 0.5,
        ...v7, 0.2, 0.0, 0.5,
    ])
    const size = vertexes.BYTES_PER_ELEMENT;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexes, gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 6 * size, 0)
    gl.enableVertexAttribArray(a_position)

    const a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 6 * size, 3 * size)
    gl.enableVertexAttribArray(a_color)
}

function draw() {
    // 清空canvas画布
    gl.clearColor(0.5, 0.5, 0.5, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    for (let i = 0; i < 24; i += 4) {
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
    }
}


