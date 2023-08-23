import initShaders from "../initShaders.js";
import { mat4,glMatrix } from '../gl_matrix/esm/index.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec3 a_position;
uniform mat4 u_s_matrix;
uniform mat4 u_t_matrix;
uniform mat4 u_r_matrix;

void main (){
    mat4 modelMatrix = u_r_matrix * u_t_matrix;
    gl_Position = modelMatrix * vec4(a_position,1.0);
}
`
const fragmentShader = `
precision mediump float;

void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}
`
initShaders(gl, vertexShader, fragmentShader)
initVertexesBuffer();

const tMatrix = mat4.create();
const sMatrix = mat4.create();
const rMatrix = mat4.create();

mat4.fromTranslation(tMatrix,[0.5,0.0,0.0])
mat4.fromScaling(sMatrix,[1,1.2,1])
mat4.fromRotation(rMatrix,glMatrix.toRadian(90),[0,0,1]);

const u_t_matrix = gl.getUniformLocation(gl.program, 'u_t_matrix');
gl.uniformMatrix4fv(u_t_matrix,false,tMatrix);

const u_s_matrix = gl.getUniformLocation(gl.program, 'u_s_matrix');
gl.uniformMatrix4fv(u_s_matrix,false,sMatrix);

const u_r_matrix = gl.getUniformLocation(gl.program, 'u_r_matrix');
gl.uniformMatrix4fv(u_r_matrix,false,rMatrix);

draw();

function initVertexesBuffer() {
    const vertexes = new Float32Array([
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.0, 0.8, 0.0,
    ])
    const SIZE = vertexes.BYTES_PER_ELEMENT;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexes, gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(gl.program, 'a_position')
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 3 * SIZE, 0);
    gl.enableVertexAttribArray(a_position);
}

function draw() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3)
}


