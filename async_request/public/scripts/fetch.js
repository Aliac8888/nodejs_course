function handleDeleteTask(btn) {
  const csrfToken = btn.parentNode.querySelector("[name='_csrf']").value;
  const taskId = btn.parentNode.querySelector("[name='taskId']").value;
  const taskElement = btn.closest("div.task-card");

  fetch("/tasks/delete/" + taskId, {
    method: "DELETE",
    headers: {
      "x-csrf-token": csrfToken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === 200) {
        taskElement.remove();
      }
    })
    .catch((err) => console.log(err));
}
