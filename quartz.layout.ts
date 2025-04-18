import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.MobileOnly(Component.Search()),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Spacer()),
    
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    //Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Search()),
    Component.DesktopOnly(Component.Darkmode()),
    Component.Explorer(),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Darkmode()),
    //Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    //Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    //Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.MobileOnly(Component.Search()),
    Component.MobileOnly(Component.Spacer()),
    Component.MobileOnly(Component.Darkmode()),
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.DesktopOnly(Component.PageTitle()),
    //Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Search()),
    Component.DesktopOnly(Component.Darkmode()),
    Component.Explorer(),
  ],
  right: [],
}
