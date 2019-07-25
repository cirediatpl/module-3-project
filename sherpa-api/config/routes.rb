Rails.application.routes.draw do
  resources :appointments
  resources :coaches
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  post "/login", to: "users#login"
  post "/login", to: "coaches#login"

end
