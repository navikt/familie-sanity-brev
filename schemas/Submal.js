export default {
    name: "submal",
    type: "document",
    title: "Submal",
    fields: [
        {
            name: "tittel",
            type: "string",
            title: "Submal navn",
            validation: Rule => Rule.required()
        },
        {
            name: "submal_block",
            type: "markdown",
            title: "Innhold",
            validation: Rule => Rule.required()
        }
    ]
}