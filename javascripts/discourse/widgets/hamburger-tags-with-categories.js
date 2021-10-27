import I18n from "I18n";
import { createWidget } from "discourse/widgets/widget";
import getURL from "discourse-common/lib/get-url";
import { h } from "virtual-dom";

export default createWidget("hamburger-tags-with-categories", {
  tagName: "ul.tag-links.clearfix",
  buildKey: () => "hamburger-tags-with-categories",

  settings: {
    maxTagsPerCategory: settings.max_tags_per_category,
    maxCategories: settings.max_categories_to_show,
  },

  html(attrs) {
    const categories = this.site.categories;
    if (categories.length === 0) {
      return;
    }

    let visibleCategories = 0;

    const result = [
      categories.map((category) => {
        if (!category.allowed_tags.length) {
          return;
        }

        if (visibleCategories < this.settings.maxCategories) {
          let visibleTags = 0;

          const markup = h("div.category-with-tags", [
            this.attach("hamburger-category", category),
            category.allowed_tags.map((tag) => {
              if (visibleTags < this.settings.maxTagsPerCategory) {
                visibleTags++;
                return this.createTagNode(category, tag);
              }
            }),
          ]);

          visibleCategories++;
          return markup;
        }
      }),
    ];

    const href = getURL("/tags");
    const title = I18n.t("tagging.tags");

    return [
      h(
        "li.heading",
        h("a.d-link.widget-link.categories-link", { href }, [title])
      ),
      result,
    ];
  },

  createTagNode(category, tag) {
    const tagStyle = this.siteSettings.tag_style;
    const href = `/tags${category.path}/${tag}`;

    return h(
      "li.tag-link-item",
      h(
        `a.discourse-tag.tag-link.${tagStyle}`,
        { attributes: { href, "data-auto-route": "" } },
        h("span.d-label", tag)
      )
    );
  },
});
