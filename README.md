#Chạy migrate db
npx sequelize db:migrate

#Chạy cả project
npm run dev

INSERT INTO categories (code, value, createdAt, updatedAt) VALUES ("CTCH", "Cho thuê căn hộ", current_timestamp, current_timestamp);
INSERT INTO categories (code, value, createdAt, updatedAt) VALUES ("CTMB", "Cho thuê mặt bằng", current_timestamp, current_timestamp);
INSERT INTO categories (code, value, createdAt, updatedAt) VALUES ("CTPT","Cho thuê phòng trọ", current_timestamp, current_timestamp);
INSERT INTO categories (code, value, createdAt, updatedAt) VALUES ("NCT", "Nhà cho thuê", current_timestamp, current_timestamp);
