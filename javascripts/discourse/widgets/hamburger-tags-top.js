import I18n from "I18n";
import { createWidget } from "discourse/widgets/widget";
import getURL from "discourse-common/lib/get-url";
import { h } from "virtual-dom";

export default createWidget("hamburger-tags-top", {
  tagName: "ul.tag-links.clearfix",
  buildKey: () => "hamburger-tags-top",

  settings: {
    maxTopTags: settings.max_top_tags,
  },

  html(attrs) {
    const tags = this.site.top_tags;
    if (tags.length === 0) {
      return;
    }

    let visibleTags = 0;
    const result = [];

    tags.map((tag) => {
      if (visibleTags < this.settings.maxTopTags) {
        result.push(this.createTagNode(tag));
        visibleTags++;
      }
    });

    const href = getURL("/tags");
    const title = I18n.t("tagging.tags");

    return [
      h(
        "li.heading",
        h("a.d-link.categories-link", { attributes: { href } }, [title])
      ),
      result,
    ];
  },

  createTagNode(tag) {
    const tagStyle = this.siteSettings.tag_style;

    return h(
      "li.tag-link-item",
      h(`a.discourse-tag.tag-link.${tagStyle}`, { href: `/tag/${tag}` }, tag)
    );
  },
});
