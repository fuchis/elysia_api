export const getResourceType = (path: string) => {
    const segments = path.split("/").filter(Boolean);
    return segments[0]?.replace(/s$/, "") || "unknown"; // Ej: /users/1 → "user"
};

// Middleware para formatear respuestas exitosas
export const successInterceptor = (app: Elysia) =>
    app.onAfterHandle(({ request, response, store: { typeName } }) => {
        const source = new URL(request.url).pathname;
        const resourceType = typeName ?? getResourceType(source);

        // Formatear data según sea colección o elemento único
        const transformData = (item: any) => ({
            type: resourceType,
            id: String(item.id),
            attributes: Object.fromEntries(
                Object.entries(item).filter(([key]) => key !== "id")
            )
        });

        const data = Array.isArray(response)
            ? response.map(transformData)
            : transformData(response);

        return {
            data,
            links: { source }
        };
    });