import I18n from "I18n";
import { createWidget } from "discourse/widgets/widget";
import getURL from "discourse-common/lib/get-url";
import { h } from "virtual-dom";
import { dasherize } from "@ember/string";

export default createWidget("hamburger-tags-with-groups", {
  tagName: "ul.tag-links.clearfix",
  buildKey: () => "hamburger-tags-with-groups",

  settings: {
    maxTagsPerGroup: settings.max_tags_per_group,
    maxGroups: settings.max_tag_groups_to_show,
  },

  html(attrs) {
    const tagGroups = attrs.results;
    let visibleGroups = 0;

    const result = [
      tagGroups.map((group) => {
        const groupName = group.name;
        const groupClass = dasherize(groupName);
        if (visibleGroups < this.settings.maxGroups) {
          let visibleTags = 0;

          const markup = h("div.group-with-tags", [
            h(`div.hamburger.tag-group.${groupClass}`, groupName),
            group.tag_names.map((tag) => {
              if (visibleTags < this.settings.maxTagsPerGroup) {
                visibleTags++;
                return this.createTagNode(tag);
              }
            }),
          ]);

          visibleGroups++;
          return markup;
        }
      }),
    ];

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
