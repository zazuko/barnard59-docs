# barnard59-docs

`barnard59-docs` generates markdown documentation of data from `manifest.ttl` in barnard59 packages.

## CLI

The package provides a command line interface.
Just call it with a list of packages and pipe the output to a file:

```bash
barnard59-docs barnard59-core barnard59-base > docs.md
```

The packages are listed in the order they are given.
https://unpkg.com/ is used to resolve the `manifest.ttl` and `package.json` file.  
The markdown is generated based on the templates `package.template` and `operation.template`.
Both templates can be overwritten with command line arguments.
The templates are evaluated as ES6 template strings.
