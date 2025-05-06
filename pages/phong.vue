<template>
  <header>
    <TheHeader />
  </header>
  <div :class="['container', { 'dark-mode': themeStore.isDarkMode }]">
    <h1 class="header">{{ translations.title }}</h1>

    <!-- Form lọc -->
    <va-card outlined class="filter-form">
      <div class="filter-group">
        <label for="maPhong">{{ translations.roomId }}:</label>
        <va-input
          id="maPhong"
          v-model="filters.maPhong"
          :placeholder="translations.enterRoomId"
          outlined
          @input="filterRooms"
        />
      </div>
      <div class="filter-group">
        <label for="loaiPhong">{{ translations.roomType }}:</label>
        <va-input
          id="loaiPhong"
          v-model="filters.loaiPhong"
          :placeholder="translations.enterRoomType"
          outlined
          @input="filterRooms"
        />
      </div>
      <div class="filter-group">
        <label for="giaPhong">{{ translations.maxPrice }}:</label>
        <va-input
          id="giaPhong"
          v-model="filters.giaPhong"
          :placeholder="translations.enterMaxPrice"
          outlined
          type="number"
          @input="filterRooms"
        />
      </div>
      <div class="filter-group">
        <label for="tang">{{ translations.floor }}:</label>
        <va-input
          id="tang"
          v-model="filters.tang"
          :placeholder="translations.enterFloor"
          outlined
          type="number"
          @input="filterRooms"
        />
      </div>
      <div class="filter-group">
        <label for="trangThai">{{ translations.status }}:</label>
        <va-select
          id="trangThai"
          v-model="filters.trangThai"
          :options="[ 
            { value: '', label: translations.all },
            { value: 'Còn trống', label: translations.available },
            { value: 'Đã đặt', label: translations.booked },
          ]"
          outlined
          @change="filterRooms"
        />
      </div>
      <div class="filter-actions">
        <va-button color="primary" @click="sortRooms('asc')">{{ translations.sortAsc }}</va-button>
        <va-button color="primary" @click="sortRooms('desc')">{{ translations.sortDesc }}</va-button>
      </div>
    </va-card>

    <!-- Loading Skeleton -->
    <VaInnerLoading :loading="loading" color="danger" type="rectangle-bounce">
      <div v-if="error" class="error-message">
        Lỗi: {{ error }}
      </div>

      <!-- Danh sách phòng -->
      <div v-else-if="filteredRooms.length" class="services-grid">
        <va-card
          v-for="room in filteredRooms"
          :key="room.maPhong"
          class="room-card"
          outlined
        >
          <img :src="room.urlAnhChinh" alt="Hình ảnh phòng" class="room-image" />
          <va-card-title>
            <div class="room-title">{{ room.loaiPhong }}</div>
          </va-card-title>
          <va-card-content>
            <p class="room-price">{{ translations.price }}: <strong>{{ room.giaPhong.toLocaleString() }} VND</strong></p>
            <p class="room-floor">{{ translations.floor }}: {{ room.tang }}</p>
            <p class="room-bed-type">{{ translations.bedType }}: {{ room.kieuGiuong }}</p>
            <span
              class="room-status"
              :class="room.tinhTrang === '1' ? 'available' : 'booked'"
            >
              {{ room.tinhTrang === '1' ? translations.available : translations.booked }}
            </span>
          </va-card-content>
          <va-card-actions class="card-actions">
            <nuxt-link :to="`/phong/${room.maPhong}`" class="view-details">
              <va-button color="primary">{{ translations.viewDetails }}</va-button>
            </nuxt-link>
          </va-card-actions>
        </va-card>
      </div>

      <!-- Nếu không có phòng -->
      <VaAlert v-else type="info" class="no-services">
        {{ translations.noRooms }}
      </VaAlert>
    </VaInnerLoading>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useThemeStore } from '~/store/DarkMode';
import { useLanguageStore } from '~/store/Language';
import TheHeader from '../Components/Header.vue';
import { VaInnerLoading, VaCard, VaCardTitle, VaCardContent, VaCardActions, VaButton, VaInput, VaSelect, VaAlert } from 'vuestic-ui';
import { axiosBase } from '~/utils/axiosBase'; // Import axiosBase

const themeStore = useThemeStore();
const languageStore = useLanguageStore();

const rooms = ref([]);
const filteredRooms = ref([]);
const loading = ref(true);
const error = ref(null);
const filters = ref({ maPhong: '', loaiPhong: '', giaPhong: '', tang: '', trangThai: '' });

const translations = computed(() => {
  const lang = languageStore.currentLanguage;
  return languageStore.t;
});

onMounted(async () => {
  try {
    // Gọi API bằng axiosBase
    const response = await axiosBase.get('/PhongWithTienNghi');
    rooms.value = response.data;
    filteredRooms.value = response.data;
  } catch (err) {
    error.value = err.message || 'Lỗi khi gọi API';
    console.error('Lỗi khi gọi API:', err);
  } finally {
    loading.value = false;
  }
});

const filterRooms = () => {
  filteredRooms.value = rooms.value.filter((room) => {
    return (
      (filters.value.maPhong ? room.maPhong.includes(filters.value.maPhong) : true) &&
      (filters.value.loaiPhong ? room.loaiPhong.includes(filters.value.loaiPhong) : true) &&
      (filters.value.giaPhong ? room.giaPhong <= filters.value.giaPhong : true) &&
      (filters.value.tang ? room.tang == filters.value.tang : true) &&
      (filters.value.trangThai ? room.trangThai.includes(filters.value.trangThai) : true)
    );
  });
};

const sortRooms = (order) => {
  filteredRooms.value = filteredRooms.value.sort((a, b) => {
    return order === 'asc' ? a.giaPhong - b.giaPhong : b.giaPhong - a.giaPhong;
  });
};

const addToCart = (room) => {
  alert(`${translations.value.addToCart}: ${room.loaiPhong}`);
};

const filterByRoomType = (type) => {
  filters.value.loaiPhong = type;
  filterRooms();
};
</script>

<style scoped>

.container {

  max-width: 1400px;
  margin: auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  font-size: 2rem;
  

}
.dark-mode-switch {
  text-align: right;
 
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;

  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
 
}

.filter-group label {
  font-weight: bold;
}

.filter-actions {
  display: flex;
  gap: 10px;
  flex: 1 1 100%;
  justify-content: flex-end;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.room-card {
  border: 2px solid #ccc;
  border-radius: 10px;
  
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.room-card:hover {
  transform: translateY(-5px);
}

.room-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.room-status {
  margin-top: 10px;
  font-weight: bold;
  display: inline-block;
  padding: 5px 10px !important;
  border-radius: 5px !important;
  font-size: 0.9rem !important;
}

.room-status.available {
  background-color: #2ecc71 !important; /* Màu xanh lá */
  color: #ffffff !important; /* Chữ màu trắng */
}

.room-status.booked {
  background-color: #e74c3c !important; /* Màu đỏ */
  color: #ffffff !important; /* Chữ màu trắng */
}

.va-button {
  font-size: 0.9rem !important;
  padding: 10px 15px !important;
  border-radius: 5px !important;
}

.va-button[disabled] {
  background-color: #cccccc !important; /* Màu xám cho nút bị vô hiệu hóa */
  color: #666666 !important;
  cursor: not-allowed !important;
}

.card-actions {
  display: flex;
  justify-content: center; /* Căn giữa nút "Xem chi tiết" */
}

.dummy-buttons {
  display: flex;
  justify-content: center; /* Căn giữa các nút giả */
  gap: 10px; /* Khoảng cách giữa các nút */
  margin: 20px 0; /* Khoảng cách trên và dưới */
}

.dummy-buttons .va-button {
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
}

/* Dark Mode Styles */
.container.dark-mode {
  background-color: #2c3e50;
  color: #f0f0f0;
}

.container.dark-mode .filter-form {
  background-color: #34495e;
}

.container.dark-mode .room-card {
  background-color: #34495e;
  color: #f0f0f0;
  border: 1px solid #555;
}

.container.dark-mode .room-status.available {
  color: #2ecc71;
}

.container.dark-mode .room-status.booked {
  color: #e74c3c;
}
</style>