void main()
{
	vec2 uv0 = vUV.st - .5;

    uv0.x *= iResolution.x / iResolution.y;

    uv0 *= magic(iF2, iB2, 847) * 20 + 3;

    uv0.x += iTime * iTempo / 60;

    vec4 data = voronoi(uv0, magic(iF1, iB1, 835));

    float f = data.x / (data.x + data.y);

    f = sin(f * PI * (1 + magic(iF3, iB3, 379) * 20)) * 0.5 + 1;

    int nf = int(magic(478) * 6);

    if(nf > 0) {
        f *= noise_f(uv0, nf - 1);
    }

    fragColor = TDOutputSwizzle(vec4(f, f, f,1.));
}