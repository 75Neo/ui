# Changelog

Every notable change to 75NeoUI, newest first.

## 1.0.1 - 2026-09-09

### Fixed

- Install @75neo/ui as a devDependency

## 1.0.0 - 2026-09-09

### Added

- Replace the shadcn CLI with @75neo/ui (#62)
- Improve copy button (#61)
- Redesign the document and design system (#60)
- Add the picker and canvas components over Ark UI
- Add the remaining display components over Ark UI
- Add the layout and feedback components over Ark UI
- Add select, listbox and combobox over Ark UI
- Remove landing page
- Add the form components over Ark UI
- Add the overlay components over Ark UI
- Add ten more components over Ark UI
- Build the documentation site
- Add the component over Ark UI
- Add the component
- Add the component over Ark UI
- Add Container component
- Distribute the library as a shadcn registry
- Declare native button attributes on the Vue component
- Implement styles, React and Vue components
- Migrate the layout family to anatomy
- Migrate FileUpload, Marquee, NavigationMenu, ScrollArea and Swap to anatomy
- Migrate Carousel, Pagination, Slider, Splitter and Tooltip to anatomy
- Migrate Avatar, Collapsible, AngleSlider, QrCode and Timer to anatomy
- Migrate Progress, Steps, Toast and Tour to anatomy
- Migrate Dialog, Drawer, Popover, HoverCard and FloatingPanel to anatomy
- Migrate DatePicker, DateInput and ColorPicker to anatomy
- Migrate Toggle, ToggleGroup, Tabs and DownloadTrigger to anatomy
- Migrate Checkbox, RadioGroup, Switch, SegmentGroup and RatingGroup to anatomy
- Migrate NumberInput, PasswordInput, PinInput, TagsInput and Editable to anatomy
- Migrate Select, Combobox, Listbox, Menu and TreeView to anatomy
- Migrate Clipboard and TableOfContents to anatomy
- Rebuild Button and Accordion as styled Ark anatomy
- Settle the hero, put the theme behind a menu, and rework the landing page
- Draw the GitHub mark, enlarge the chrome, and light the code blocks
- Rebuild the docs and playground on one shell, with client-side routing
- Add TreeView component
- Add Tour component
- Add ToggleGroup component
- Add Toggle component
- Add Toast component
- Add Timer component
- Add Swap component
- Add Steps component
- Add Splitter component
- Add ScrollArea component
- Add QrCode component
- Add PasswordInput component
- Add NavigationMenu component
- Add Marquee component
- Add Listbox component
- Add HoverCard component
- Add FloatingPanel component
- Add Editable component
- Add Drawer component
- Add DownloadTrigger component
- Add SegmentGroup component
- Add RatingGroup component
- Add FileUpload component
- Add Pagination component
- Add Menu component
- Add TagsInput component
- Add PinInput component
- Add NumberInput component
- Add Select component
- Add the layout components
- Add Slider component
- Add Progress component
- Add RadioGroup component
- Add Tabs component
- Add Popover component
- Add Tooltip component
- Add Switch component
- Add Dialog component
- Add DatePicker component
- Add DateInput component
- Add Combobox component
- Add ColorPicker component (#14)
- Add Collapsible component
- Add Checkbox component
- Build the documentation site
- Add Clipboard and TableOfContents components
- Collapse color roles into one token per color (#13)
- Add carousel
- Add Avatar component
- Add angle slider
- Add playground based on Astro (#11)
- Reimplement Theme api (#10)
- Simplify component api
- Add rule for single-file components in AGENTS.md
- Add Carousel component with various configurations and styles for Vue and React (#7)
- Add Avatar component and stories (#6)
- Add AngleSlider component and related stories for React and Vue (#5)
- Add Accordion
- Add theme override api
- Improve design system and code structure (#2)
- Update button props
- Complete the button style
- Clean dev structure
- Update import url
- Simplify component api
- Migrate to tailwindcss
- Add accordion component

### Build

- Generate the docs stylesheet from the item metadata
- Generate the manifests from the component folders
- Give the apps back their workspace dependencies
- Drop the apps' workspace dependencies on the packages
- Update turbo config
- Update oxlint, oxfmt and vscode config for tailwind development
- Update bundler config

### Changed

- Extend ButtonHTMLAttributes on the Vue component
- Type the Vue class prop as a button attribute
- Rebuild both shells out of the design system's own numbers
- Reach every playground page from the palette, and cut the comments back
- Drop the component nav from the layout
- Update agent skills and improve component api

### Documentation

- Rewrite AGENTS.md files for the anatomy architecture
- Rewrite the guidance files, the README and the landing page
- Cut the workflow comments back
- Update doc comments, README.md, and AGENTS.md
- Improve AGENTS.md
- Update AGENTS.md and README.md

### Fixed

- Inject theme via css block instead of file copy
- Render the teleporting previews on the client only
- Render every preview and drop the unused React renderer
- Merge caller classes with cn
- Stop forwarding an empty slot into Ark's text parts
- Place the search dialog, and give the playground theme control icons
- Create the Pages project on the first deploy
- Deploy the docs with pnpm dlx rather than the wrangler action
- Install wrangler with npm rather than pnpm
- Publint
- Add css export
- Typecheck depends on build
- Add exports
