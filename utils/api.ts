export async function fetchUrl<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

export async function fetchTasks(): Promise<any> {
  return await fetchUrl("/api/tasks");
}

export async function postTask(newTask) {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  if (response.ok) {
    return response;
  } else {
    alert("Task already exists " + response.status);
  }
}
