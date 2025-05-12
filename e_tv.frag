void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);
    
    // controls

    float lens_v = magic(iF6, iB6, 113);

    float horizontal_noise = magic(iF7, iB7, 251);

    float zoom = magic(iF8, iB8, 682);

    // logic
    
    vec2 uv2 = uv1;

    float k1 = magic(iF6, iB6, 847) * 0.5;

    uv2 *= 1 + magic(iF8, iB8, 424) * 2;

    uv2 = lens(uv2, -k1, k1);

    float k = magic(iF7, iB7, 938);

    vec3 c = vec3(
        frame_b(uv2 + vec2((rand(uv0.y * 1000 + iTime) - 0.5) * k * 0.1, 0), 0).x,
        frame_b(uv2 + vec2((rand(uv0.y * 1100 + iTime) - 0.5) * k * 0.1, 0), 0).y,
        frame_b(uv2, 0).z
    );

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}