void main()
{
	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);
    
    uv1 = mix(uv1, kal2(uv1 * rot(0.25), floor(magic(iF5, iB5, 238) * 9 + 1)) * vec2(1, -2) + vec2(0, -0.5), iB5.x);    

    uv1 *= rot(magic(iF6, iB6, 271, 4));

    uv1.x = (saw(uv1.x / ratio + 0.5 + magic(iF7, iB7, 312, 4) * 2) - 0.5) * ratio;

    vec3 c = frame(uv1, 0);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}