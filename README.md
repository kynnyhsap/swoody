# Swoody

## Contibution

NPM Scripts:

-   `dev` : Starting server for development
-   `test` : Run all tests

### Commit Messages

Commit messages should follow the Semantic Commit Messages format:

```
label(namespace): title

description
```

1.  _label_ is one of the following:
    -   `🐞 bug` - bug fixes.
    -   `⚡️ feature` - new features.
    -   `🔍 test` - changes to tests infrastructure.
    -   `♻️ refactoring` - code refactoring, styling, formatting etc.
    -   `😒 chore` - just chores.
    -   `📝 docs` - changes to docs.
    -   `🔖 v0.0.0` - version tag.
2.  _namespace_ is put in parenthesis after label and is optional.
3.  _title_ is a brief summary of changes.
4.  _description_ is **optional**, new-line separated from title and is in present tense.

Example:

```
fix(Page): fix page.pizza method

This patch fixes page.pizza so that it works with iframes. Fixes #123, Fixes #234
```
