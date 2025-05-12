void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF2, iB2, 776);

    float voronoi_distort = magic(iF3, iB3, 566);

    float details = magic(iF4, iB4, 596);

    float noise_factor = magic(712);

    // logic

    vec2 uv2 = uv1;

    uv2 *= zoom * 20 + 3;

    uv2.x += iTime * iTempo / 60;

    vec4 data = voronoi(uv2, voronoi_distort);

    float f = data.x / (data.x + data.y);

    f = sin(f * PI * (details * 20)) * 0.5 + 1;

    int nf = int(noise_factor * 6);

    f *= mix(1, noise_f(uv2, nf - 1), step(0.0, float(nf)));

    // output

    fragColor = TDOutputSwizzle(vec4(f, f, f,1.));
}