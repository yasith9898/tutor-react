export default function (plop) {
    plop.setGenerator('page', {
        description: 'Create a new page slice',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Page name (e.g. register or login):'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{kebabCase name}}/ui/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Page.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/{{kebabCase name}}/ui/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/Page.stories.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/{{kebabCase name}}/ui/{{pascalCase name}}.test.tsx',
                templateFile: 'plop-templates/Page.test.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/{{kebabCase name}}/index.ts',
                template: "export { {{pascalCase name}} } from './ui/{{pascalCase name}}';"
            }
        ]
    });
    plop.setGenerator('adminpage', {
        description: 'Create a new admin page slice',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Page name (e.g. register or login):'
            }
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/admin/{{kebabCase name}}/ui/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Page.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/admin/{{kebabCase name}}/ui/{{pascalCase name}}.stories.tsx',
                templateFile: 'plop-templates/Page.stories.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/admin/{{kebabCase name}}/ui/{{pascalCase name}}.test.tsx',
                templateFile: 'plop-templates/Page.test.tsx.hbs'
            },
            {
                type: 'add',
                path: 'src/pages/admin/{{kebabCase name}}/index.ts',
                template: "export { {{pascalCase name}} } from './ui/{{pascalCase name}}';"
            }
        ]
    });
}