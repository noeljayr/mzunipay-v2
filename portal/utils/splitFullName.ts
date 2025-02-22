export function splitFullName(fullName: string): {
  userFirstName: string;
  userLastName: string;
} {
  // Remove extra whitespace and split the name by one or more spaces
  const parts = fullName.trim().split(/\s+/);

  // If there's only one part, we can assume no last name was provided
  const userFirstName = parts[0] || "";
  const userLastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

  return { userFirstName, userLastName };
}
