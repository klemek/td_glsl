void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);
    
    // controls

    float v6 = magic(iF6, iB6, 666);

    float v7 = magic(iF7, iB7, 777);

    float v8 = magic(iF8, iB8, 888);

    // logic
    
    vec2 uv2 = uv1;

    vec3 c = frame(uv2, 0);

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}