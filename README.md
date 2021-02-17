# barnard59-docs

`barnard59-docs` generates markdown documentation of data from `manifest.ttl` in barnard59 packages.

## CLI

The package provides a command line interface to create markdown with details about packages compatible with barnard59

### Extracting info about published packages

Just call it with a list of packages and pipe the output to a file:

```bash
barnard59-docs barnard59-core barnard59-base > docs.md
```

The packages are listed in the order they are given.
https://unpkg.com/ is used to resolve the `manifest.ttl` and `package.json` file.  
The markdown is generated based on the templates `package.template` and `operation.template`.
Both templates can be overwritten with command line arguments.
The templates are evaluated as ES6 template strings.

### Extracting info about local package

```bash
barnard59-docs --local .
```

By default, is looks for a `package.json` and `manifest.ttl` in each of the given directories. Additional option can be provided to change the expected manifest's location relative to the package.

```bash
barnard59-docs --local --manifest about.ttl package/barnard59-example
```
