export async function fetchUrl<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

export async function fetchUsers(): Promise<any> {
  return await fetchUrl("/api/tasks");
}
