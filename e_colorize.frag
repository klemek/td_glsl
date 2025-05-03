void main()
{
	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    float f = mean(frame(uv1, 0));

    float c_black = magic(iF5, iB5, 432, 4);
    float c_white = magic(iF6, iB6, 342, 4);
    float delta = magic(iF7, iB7, 493, 4);

    float c_mix = mix(c_black, c_white, f) + delta;

    vec3 c = mix(c_black > 0 ? col(c_mix) : vec3(0), c_white > 0 ? col(c_mix) : vec3(1), f);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}