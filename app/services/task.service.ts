const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.socialking.vn";

class TaskService {
  async create(servicePayload: any) {
    return this.createTask(servicePayload);
  }

  async createTask(payload: any) {
    const res = await fetch(`${BASE_URL}/task/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  }

  async getLatest(serviceName: string) {
    return this.getLatestTask(serviceName);
  }

  async getLatestTask(serviceName: string) {
    const res = await fetch(`${BASE_URL}/task/latest?service_name=${serviceName}`, {
      cache: "no-store",
    });

    return res.json();
  }

  async getPendingTasks(limit: number = 20) {
    const res = await fetch(`${BASE_URL}/task/get-process?_limit=${limit}`);
    return res.json();
  }

  async update(taskId: string, data: any) {
    return this.updateTask(taskId, data);
  }

  async updateTask(taskId: string, data: any) {
    const res = await fetch(`${BASE_URL}/task/update/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  }
}

const taskService = new TaskService();
export default taskService;
