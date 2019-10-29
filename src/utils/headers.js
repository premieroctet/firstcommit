export function parseLinkHeader(linkHeader) {
  if (linkHeader.length === 0) {
    throw new Error("input must not be of zero length");
  }

  // Split parts by comma and parse each part into a named link
  return linkHeader.split(/(?!\B"[^"]*),(?![^"]*"\B)/).reduce((links, part) => {
    const section = part.split(/(?!\B"[^"]*);(?![^"]*"\B)/);
    if (section.length < 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();

    links[name] = url;

    return links;
  }, {});
}
