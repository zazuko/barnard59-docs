# barnard59-docs

`barnard59-docs` generates markdown documentation for `barnard59` packages.
It creates a list, and description of all publicly available barnard59 packages.
It also creates detailed documentation for requested packages, based on `manifest.ttl` in those packages.

## CLI

The package provides a command line interface.

To generate list of all `barnard59` packages
```bash
barnard59-overview > packages.md
```
The markdown is generated based on the template `packageList.template`.


To generate list of functions in selected packages:
```bash
barnard59-docs barnard59-core barnard59-base > docs.md
```

The packages are listed in the order they are given.
https://unpkg.com/ is used to resolve the `manifest.ttl` and `package.json` file.
The markdown is generated based on the templates `package.template` and `operation.template`.
Both templates can be overwritten with command line arguments.
The templates are evaluated as ES6 template strings.
