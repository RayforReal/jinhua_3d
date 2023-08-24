import initShaders from "../initShaders.js";

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

const vertexShader = `
attribute vec3 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;

void main(){
    v_uv=a_uv;
    gl_Position = vec4(a_position,1.0);
}
`;
const fragmentShader = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_sampler;

void main(){
    gl_FragColor = texture2D(u_sampler,v_uv);
}
`;

initShaders(gl, vertexShader, fragmentShader)

initVertexBuffer();
initTextures();

function initTextures() {
    const texture = gl.createTexture();
    const u_sampler = gl.getUniformLocation(gl.program, 'u_sampler');

    const image = new Image();
    image.src = '../cat_512x512.jpg';

    image.onload = function () {
        // 翻转图片的Y轴,默认是不翻转
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        //激活贴图 放在第0个单元上（任何系统最少支持8个单元，机器越好越多）
        gl.activeTexture(gl.TEXTURE0);
        //绑定贴图（哪种贴图，哪个贴图）
        gl.bindTexture(gl.TEXTURE_2D, texture)
        // 对贴图的参数进行设置gl.texParameteri(贴图的种类，参数的名称，具体值)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)

        // 贴图用哪张图片，即用image作为texture
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
        gl.uniform1i(u_sampler, 0);

        draw()
    }
}

function initVertexBuffer() {
    const vertex = new Float32Array([
        0.5, 0.5, 0.0, 1.0, 1.0,
        0.5, -0.5, 0.0, 1.0, 0.0,
        -0.5, -0.5, 0.0, 0.0, 0.0,
        -0.5, 0.5, 0.0, 0.0, 1.0,
    ])
    const size = vertex.BYTES_PER_ELEMENT;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW);
    // 矩形坐标信息
    const a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, 5 * size, 0);
    gl.enableVertexAttribArray(a_position)

    // 贴图坐标信息
    const a_uv = gl.getAttribLocation(gl.program, 'a_uv');
    gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, 5 * size, 3* size);
    gl.enableVertexAttribArray(a_uv)
}

function draw() {
    gl.clearColor(1.0, 0.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4)
}

