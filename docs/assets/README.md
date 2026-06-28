# Assets

Media used in the repository's documentation.

## demo.gif (README hero)

`demo.gif` is the animated terminal cast shown at the top of the root `README.md`.
It is generated from [`demo.tape`](./demo.tape) with
[VHS](https://github.com/charmbracelet/vhs):

```bash
# from the repo root
vhs docs/assets/demo.tape
```

This writes `docs/assets/demo.gif`. The tape scaffolds a throwaway
`plugins/release-notes` to show the developer experience and deletes it at the
end, so your working tree is left unchanged. Re-run it whenever the scaffolder
output changes.

Once `demo.gif` exists, embed it near the top of the root `README.md`:

```markdown
![Scaffolding a Cowork plugin with the hub's plugin-builder](./docs/assets/demo.gif)
```

Keep generated media reasonably small (a few hundred KB). If the GIF gets large,
trim the tape's `Sleep` durations or lower the `Width`/`Height`.
