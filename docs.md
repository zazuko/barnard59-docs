barnard59-core
barnard59-base
barnard59-shell
barnard59-http
barnard59-ftp
barnard59-formats
barnard59-graph-store
barnard59-sparql
barnard59-rdf
# barnard59-core

Core component of Barnard59 Linked Data pipelines

## Read file

Reads a file from the local file system.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:fs#createReadStream>
].
```

## Write file

Writes a file to the local file system.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:fs#createWriteStream>
].
```

# barnard59-base

Linked Data pipelines

## Combine

Combines multiple streams to a single stream connecting them in the given order.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#combine>
].
```

## Concat

Concatenates the content of the given streams to a single stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#concat>
].
```

## Concat (Object)

Concatenates the content of the given streams to a single stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#concat.object>
].
```

## Filter

Forwards incoming chunks if they pass the filter function.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#filter>
].
```

## Flatten

Separates incoming arrays into their elements and emits each element as a single chunk.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#flatten>
].
```

## Glob

Match files using the given pattern and emits each filename as a single chunk.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#glob>
].
```

## Parse JSON

Converts each chunk to an object by calling JSON.parse().

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#json.parse>
].
```

## Serialize JSON

Converts each chunk to a JSON string by calling JSON.stringify().

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#json.parse>
].
```

## Limit

Limits the amount of forwarded chunks and discards any chunks after reaching the limit.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#limit>
].
```

## Map

Converts each chunk using the given function.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#map>
].
```

## /dev/null

Dummy output stream, just like /dev/null.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#nul>
].
```

## Offset

Discards all chunks before the given offset.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#offset>
].
```

## stdout

Writes the incoming data to stdout and also forwards the data to the stream output.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#stdout>
].
```

## To String

Converts each chunk to a string by calling .toString().

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-base#toString>
].
```

# barnard59-shell

Shell command support for Barnard59 Linked Data pipelines

## Shell (after)

Runs the given command in a shell after all chunks have been processed.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-shell/after.js>
].
```

## Shell (before)

Runs the given command in a shell before any chunk has been processed.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-shell/begin.js>
].
```

## Shell

Runs the given command in a shell and forwards stdin and stdout.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-shell>
].
```

# barnard59-http

HTTP protocol support for Barnard59 Linked Data pipelines

## HTTP GET request

Makes a HTTP GET request and returns the body of the response as stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-http#get>
].
```

## HTTP POST request

Makes a HTTP POST request, sends the written data as request body and returns the body of the response as stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-http#post>
].
```

# barnard59-ftp

FTP support for Linked Data pipelines

## List files (FTP)

Lists all files in the given FTP folder.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-ftp#list>
].
```

## Move file (FTP)

Moves the given file at the end of the stream processing and forwards any incoming data.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-ftp#move>
].
```

## Read file (FTP)

Reads the given file.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-ftp#read>
].
```

# barnard59-formats

Support for various formats for Barnard59 Linked Data pipelines

## Parse CSV on the Web

Parses the given CSV stream using the given metadata.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/csvw.js#parse>
].
```

## Parse JSON-LD

Parses the given JSON-LD stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/jsonld.js#parse>
].
```

## Parse JSON-LD (Object)

Parses the given JSON-LD stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/jsonld.js#parse.object>
].
```

## Serialize JSON-LD

Serializes the given RDF/JS Quads to JSON-LD.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/jsonld.js#serialize>
].
```

## Parse N3

Parses the given N3 stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/n3.js#parse>
].
```

## Serialize N-Triples

Serializes the given RDF/JS Quads to N-Triples.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/ntriples.js#serialize>
].
```

## Parse RDF/XML

Parses the given RDF/XML stream.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-formats/rdfxml.js#parse>
].
```

# barnard59-graph-store

SPARQL Graph Store Protocol support for Linked Data pipelines

## Read RDF/JS Quads (Graph Store)

Reads RDF/JS Quads from the given named graph using the SPARQL Graph Store Protocol.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-graph-store#get>
].
```

## Append RDF/JS Quads (Graph Store)

Appends RDF/JS Quads to the given named graph using the SPARQL Graph Store Protocol.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-graph-store#post>
].
```

## Write RDF/JS Quads (Graph Store)

Writes RDF/JS Quads to the given named graph using the SPARQL Graph Store Protocol.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-graph-store#put>
].
```

# barnard59-sparql

SPARQL support for Barnard59 Linked Data pipelines

## SPARQL Select

Runs the given SELECT query against the given endpoint parses the result into rows of RDF/JS key-value pairs.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-sparql#select>
].
```

# barnard59-rdf

RDF support for Linked Data pipelines

## Map (RDF/JS Quad)

Calls a map function only for quads matching the given triple pattern.

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-rdf/mapMatch.js>
].
```

## to Cube Observation

Converts a set of quads to a Cube Observation

### Step

```
<> a p:Step;
  code:implementedBy [ a code:EcmaScript;
  code:link <node:barnard59-rdf/cube.js#toObservation>
].
```
