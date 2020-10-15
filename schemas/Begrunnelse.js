export default {
    name: "begrunnelse",
    type: "document",
    title: "Begrunnelse",
    fields: [
        {
            name: "INNVILGET_BOSATT_I_RIKTET",
            type: "string",
            description: "Dette feltet burde låses",
            title: "Navn",
            validation: Rule => Rule.required()
        },
        {
            name: "tittel",
            type: "string",
            title: "Tittel",
            validation: Rule => Rule.required()
        },
        {
            name: "tekst",
            type: "text",
            title: "Tekst",
            validation: Rule => Rule.required()
        }
    ]
}