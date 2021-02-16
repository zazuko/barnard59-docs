# barnard59-docs

`barnard59-docs` generates markdown documentation of data from `manifest.ttl` in barnard59 packages.

## CLI

The package provides a command line interface to create markdown with details about packages compatible with barnard59

### Extracting info about published packages

Call it with a list of packages and pipe the output to a file:

```bash
barnard59-docs npm barnard59-core barnard59-base > docs.md
```

The packages are listed in the order they are given.
https://unpkg.com/ is used to resolve the `manifest.ttl` and `package.json` file.  
The markdown is generated based on the templates `package.template` and `operation.template`.
Both templates can be overwritten with command line arguments.
The templates are evaluated as ES6 template strings.

### Extracting info about local package

```bash
barnard59-docs local
```

By default, is looks for a `package.json` and `manifest.ttl` in local working directory. Additional options can be provided to change their locations.

```bash
barnard59-docs local package/barnard59-example --manifest about.ttl
```

`manifest` is relative to the provided path, and not current working directory!
