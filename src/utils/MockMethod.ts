export const generateMockTemplate = (fields) => {
    return fields.reduce((template, field) => {
        if (field.type === 'object' && field.children) {
            template[field.name] = generateMockTemplate(field.children)
        } else if (field.type === 'array' && field.children) {
            template[field.name + '|1-10'] = [generateMockTemplate(field.children)]
        } else if (field.type === 'regexp') {
            let regexpString = field.rule.replaceAll("/", "");
            template[field.name] = new RegExp(regexpString)
        } else {
            template[field.name] = field.rule
        }
        return template
    }, {})
}
