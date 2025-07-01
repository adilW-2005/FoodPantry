from django.urls import path
from . import views


urlpatterns = [
    path('view-items', views.view_all_items, name='view'),
    path('view-item/<int:id>', views.view_item, name='view_item'),
    path('add-item/<int:id>', views.add_item, name='add_item'),
    path('create-item', views.create_item, name='create_item'),
    path('decrease-item-quantity/<int:id>', views.decrease_item_quantity, name='decrease_item_quantity'),
    path('delete-item/<int:id>', views.delete_item, name='delete_item'),
    path('edit-batch/<int:id>', views.edit_batch, name='edit_batch'),
]