---
type: reference
title: Keywords
description: "The C union keyword: shared storage for different variable types, with example."
tags: [c, legacy, reference, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#12"
---

# Keywords

[↑ c-kb](/kb-c/README.md)

## 12.1 The UNION keyword.

```text
The union keyword allows several variables of different type and size to occupy the same storage location.
The syntax to define a union is simular to the struct keyword as shown below:

	union union_def { int a; float b; char c;} ;
and a variable declared with either of these statements:
	union union_def union_var;
	union { int a; float b; char c;} union_var;
If you wish to initalise a variable you can say:
	union { int a; float b; char c;} union_var=97;
By default the first variable (a) is initalised.
To assign a value to a variable you can say:

	union_var.b=99.99;
	union_var.a=34;
	union_var.c='x';
It's important to note that the storage will only hold ONE value, looking at the three lines above, union_var.a overwrites union_var.b and then union_var.c overwrites union_var.a
I have yet to see more than one use for this keyword.
```

### 12.1.1 Example

```text
Unions are usually used with the company of a discriminator: a variable indicating which of the fields of the union is valid. For example, let's say you want to create your own Variant type:

struct my_variant_t {
    int type;
    union {
        char char_value;
        short short_value;
        int int_value;
        long long_value;
        float float_value;
        double double_value;
        void* ptr_value;
    };
};
Then you would use it such as:

/* construct a new float variant instance */
void init_float(struct my_variant_t* v, float initial_value) {
    v->type = VAR_FLOAT;
    v->float_value = initial_value;
}

/* Increments the value of the variant by the given int */
void inc_variant_by_int(struct my_variant_t* v, int n) {
    switch (v->type) {
    case VAR_FLOAT:
        v->float_value += n;
        break;

    case VAR_INT:
        v->int_value += n;
        break;
    ...
    }
}
This is actually a pretty common idiom, specially on Visual Basic internals.

For a real example see SDL's SDL_Event union. (actual source code here). There is a type field at the top of the union, and the same field is repeated on every SDL_*Event struct. Then, to handle the correct event you need to check the value of the type field.

The benefits are simple: there is one single data type to handle all event types without using unnecessary memory.
		12.1.2


	12.2
```
