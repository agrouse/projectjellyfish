# == Schema Information
#
# Table name: order_items
#
#  id                        :integer          not null, primary key
#  order_id                  :integer
#  cloud_id                  :integer
#  product_id                :integer
#  service_id                :integer
#  provision_status          :integer
#  created_at                :datetime
#  updated_at                :datetime
#  deleted_at                :datetime
#  project_id                :integer
#  miq_id                    :integer
#  uuid                      :uuid
#  setup_price               :decimal(10, 4)   default(0.0)
#  hourly_price              :decimal(10, 4)   default(0.0)
#  monthly_price             :decimal(10, 4)   default(0.0)
#  payload_to_miq            :json
#  payload_reply_from_miq    :json
#  payload_response_from_miq :json
#  latest_alert_id           :integer
#  password                  :string(255)
#  status_msg                :string(255)
#
# Indexes
#
#  index_order_items_on_cloud_id    (cloud_id)
#  index_order_items_on_deleted_at  (deleted_at)
#  index_order_items_on_miq_id      (miq_id)
#  index_order_items_on_order_id    (order_id)
#  index_order_items_on_product_id  (product_id)
#  index_order_items_on_service_id  (service_id)
#

describe OrderItem do
end
