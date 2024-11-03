export interface RoomResponse {
    status: string;
    statusCode: number;
    message: string;
    available: boolean; // Thêm thuộc tính available
    data: any[]; // Có thể thay đổi kiểu của data nếu cần
  }