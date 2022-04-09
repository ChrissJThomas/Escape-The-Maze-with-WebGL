class Alltexture

{
	constructor(){

		this.vertices = [];
		this.indexOrder = [];
		this.tex = createCrate();
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.length
		this.loc = [];
		this.rot = [];
		this.myTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
	}

	render(program){
		var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		var size = 3;          // 2 components per iteration
		var type = gl.FLOAT;   // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 5*Float32Array.BYTES_PER_ELEMENT;	//Size in bytes of each element     // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0;        // start at the beginning of the buffer
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

		var texCoordAttributeLocation = gl.getAttribLocation(program,'vertTexCoord');
		gl.vertexAttribPointer(
		texCoordAttributeLocation, //ATTRIBUTE LOCATION
		2, //NUMBER of elements per attribute
		gl.FLOAT, //TYPES OF ELEMENTS
		gl.FALSE,
		5*Float32Array.BYTES_PER_ELEMENT, //SIZE OF AN INDIVIDUAL VERTEX
		3*Float32Array.BYTES_PER_ELEMENT //OFFSET
		);

		gl.enableVertexAttribArray(texCoordAttributeLocation);

		var tranLoc  = gl.getUniformLocation(program,'transform');
		gl.uniform3fv(tranLoc,new Float32Array(this.loc));
		var thetaLoc = gl.getUniformLocation(program,'rotation');
		gl.uniform3fv(thetaLoc,new Float32Array(this.rot));

		gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		//setup S
		gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		//Sets up our T
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); //gl.MIRRORED_REPEAT//gl.CLAMP_TO_EDGE
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.vertices.length/5);
	}
}

class Box extends Alltexture
{
	constructor(){
		super();

		this.tex = createCrate();
		// this.buffer = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
			//x 	y		z			s 		t
			-1,		-1,		1,			0,		0,
			-1,		-1,		-1,			0,		1,
			-1,		1,		1,			1,		0,
			-1,		1,		-1,			1,		1,
	//roof
			-1,		1,		-1,			0,		0,
			-1,		1,		1,			0,		1,
			1,		1,		-1,			1,		0,
			1,		1,		1,			1,		1,
	//right side
			1,		1,		1,			0,		0,
			1,		1,		-1,			0,		1,
			1,		-1,		1,			1,		0,
			1,		-1,		-1,			1,		1,
	// farthests from camera
			1,		1,		-1,			0,		0,
			1,		-1,		-1,			0,		1,
			-1,		1,		-1,			1,		0,
			-1,		-1,		-1,			1,		1,
	//floor
			-1,		-1,		-1,			0,		0,
			-1,		-1,		1,			0,		1,
			1,		-1,		-1,			1,		0,
			1,		-1,		1,			1,		1,
	// //closest to camera
			-1,		-1,		1,			0,		0,
			1,		-1,		1,			0,		1,
			-1,		1,		1,			1,		0,
			1,		1,		1,			1,		1,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0,0,0];
		this.rot = [0,0,0];

		// this.myTexture = gl.createTexture();
		// gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,64,64,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}
}

class Box2 extends Alltexture
{
	constructor(){
		super();

		this.tex = createBrick();
		// this.buffer = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
			//x 	y		z			s 		t
			-1,		-1,		1,			0,		0,
			-1,		-1,		-1,			0,		1,
			-1,		1,		1,			1,		0,
			-1,		1,		-1,			1,		1,
	//roof
			-1,		1,		-1,			0,		0,
			-1,		1,		1,			0,		1,
			1,		1,		-1,			1,		0,
			1,		1,		1,			1,		1,
	//right side
			1,		1,		1,			0,		0,
			1,		1,		-1,			0,		1,
			1,		-1,		1,			1,		0,
			1,		-1,		-1,			1,		1,
	// farthests from camera
			1,		1,		-1,			0,		0,
			1,		-1,		-1,			0,		1,
			-1,		1,		-1,			1,		0,
			-1,		-1,		-1,			1,		1,
	//floor
			-1,		-1,		-1,			0,		0,
			-1,		-1,		1,			0,		1,
			1,		-1,		-1,			1,		0,
			1,		-1,		1,			1,		1,
	// //closest to camera
			-1,		-1,		1,			0,		0,
			1,		-1,		1,			0,		1,
			-1,		1,		1,			1,		0,
			1,		1,		1,			1,		1,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0,0,0];
		this.rot = [0,0,0];

		// this.myTexture = gl.createTexture();
		// gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,64,64,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}
}

class DinoBox extends Alltexture
{
	constructor(){
		super();

		this.tex = createCactiDino();
		// this.buffer = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
			//x 	y		z			s 		t
			-0.6,		-1,		0.6,	0,		0,
			-0.6,		-1,		-0.6,	0,		1,
			-0.6,		0.5,	0.6,	1,		0,
			-0.6,		0.5,	-0.6,	1,		1,
	//roof
			-0.6,		0.5,	-0.6,	0,		0,
			-0.6,		0.5,	0.6,	0,		1,
			0.6,		0.5,	-0.6,	1,		0,
			0.6,		0.5,	0.6,	1,		1,
	//right side
			0.6,		0.5,	0.6,	0,		0,
			0.6,		0.5,	-0.6,	0,		1,
			0.6,		-1,		0.6,	1,		0,
			0.6,		-1,		-0.6,	1,		1,
	// farthests from camera
			0.6,		0.5,	-0.6,	0,		0,
			0.6,		-1,		-0.6,	0,		1,
			-0.6,		0.5,	-0.6,	1,		0,
			-0.6,		-1,		-0.6,	1,		1,
	//floor
			-0.6,		-1,		-0.6,	0,		0,
			-0.6,		-1,		0.6,	0,		1,
			0.6,		-1,		-0.6,	1,		0,
			0.6,		-1,		0.6,	1,		1,
	// //closest to camera
			-0.6,		-1,		0.6,	0,		0,
			0.6,		-1,		0.6,	0,		1,
			-0.6,		0.5,	0.6,	1,		0,
			0.6,		0.5,	0.6,	1,		1,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0,0,0];
		this.rot = [0,0,0];

		// this.myTexture = gl.createTexture();
		// gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}
}

class SrtStpBox extends Alltexture
{
	constructor(){
		super();

		this.tex = createStSp();
		// this.buffer = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
			//x 	y		z			s 		t
			-0.6,		-1,		0.6,	0,		0,
			-0.6,		-1,		-0.6,	0,		1,
			-0.6,		0.5,	0.6,	1,		0,
			-0.6,		0.5,	-0.6,	1,		1,
	//roof
			-0.6,		0.5,	-0.6,	0,		0,
			-0.6,		0.5,	0.6,	0,		1,
			0.6,		0.5,	-0.6,	1,		0,
			0.6,		0.5,	0.6,	1,		1,
	//right side
			0.6,		0.5,	0.6,	0,		0,
			0.6,		0.5,	-0.6,	0,		1,
			0.6,		-1,		0.6,	1,		0,
			0.6,		-1,		-0.6,	1,		1,
	// farthests from camera
			0.6,		0.5,	-0.6,	0,		0,
			0.6,		-1,		-0.6,	0,		1,
			-0.6,		0.5,	-0.6,	1,		0,
			-0.6,		-1,		-0.6,	1,		1,
	//floor
			-0.6,		-1,		-0.6,	0,		0,
			-0.6,		-1,		0.6,	0,		1,
			0.6,		-1,		-0.6,	1,		0,
			0.6,		-1,		0.6,	1,		1,
	// //closest to camera
			-0.6,		-1,		0.6,	0,		0,
			0.6,		-1,		0.6,	0,		1,
			-0.6,		0.5,	0.6,	1,		0,
			0.6,		0.5,	0.6,	1,		1,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0,0,0];
		this.rot = [0,0,0];

		// this.myTexture = gl.createTexture();
		// gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,16,16,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}
}

class Floor extends Alltexture
{
	constructor(){
		super();

		this.tex = createCheckered();
		// this.buffer = gl.createBuffer();
		// gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
		this.vertices =
		[
			//x 	y		z			s 		t
	//floor
			-50,	-1,		-50,		0,		0,
			-50,	-1,		50,			0,		1,
			50,		-1,		-50,		1,		0,
			50,		-1,		50,			1,		1,

		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.loc = [0,0,0];
		this.rot = [0,0,0];

		// this.myTexture = gl.createTexture();
		// gl.bindTexture(gl.TEXTURE_2D, this.myTexture);
		gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,256,256,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(this.tex));
	}
}
