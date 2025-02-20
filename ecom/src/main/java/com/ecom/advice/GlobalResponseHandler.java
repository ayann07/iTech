package com.ecom.advice;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class GlobalResponseHandler implements ResponseBodyAdvice<Object> {

    @Override
    @Nullable
    public Object beforeBodyWrite(@Nullable Object arg0, MethodParameter arg1, MediaType arg2, Class arg3,ServerHttpRequest arg4, ServerHttpResponse arg5) 
    {

        if (arg0 instanceof ApiResponse<?>) {
            return arg0;
        }
        return new ApiResponse<>(arg0);
    }

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

}