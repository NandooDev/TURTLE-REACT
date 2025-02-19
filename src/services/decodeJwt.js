function base64UrlDecode(base64Url) {
    // Adiciona padding de `=` se necessário
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let padding = '='.repeat((4 - base64.length % 4) % 4);  // Adiciona padding
    base64 = base64 + padding;
    
    // Decodifica Base64 para string
    let decoded = atob(base64);
    return decoded;
}

export function decodeJWT(jwt) {
    let [header, payload, signature] = jwt.split('.');

    // Decodifica o Header e o Payload
    let decodedHeader = JSON.parse(base64UrlDecode(header));
    let decodedPayload = JSON.parse(base64UrlDecode(payload));

    return {
        header: decodedHeader,
        payload: decodedPayload
    };
}