require 'sidekiq/web'

Rails.application.routes.draw do




  #--------------- My Add -----------------


  #------mail_box--------
  get 'mail_boxes/index'

  #-------wiki---------
  resources :wikis

  #------status----------
  namespace :status do
    %w(workers logs versions users).each { |a| get a }
  end

  #----------- docker-----------
  resources :nodes
  resources :node_types do
    post 'build'
    post 'push'
    resources :templates, expect: [:index, :show], controller: 'node_types/templates'
    resources :vars, expect: [:index, :show], controller: 'node_types/vars'
    resources :ports, expect: [:index, :show], controller: 'node_types/ports'
    resources :volumes, expect: [:index, :show], controller: 'node_types/volumes'
  end


  #------------callback---------
  namespace :callback do
    post 'git'
    get 'confirm'
  end

  #-------------Repositories-----------
  resources :repositories do
    resources :users, expect: [:edit, :update], controller: 'repositories/users'
    %w(commits changes tree file).each { |a| get a }
  end

  #-------------DNS-------------
  get 'dns' => 'dns#index'
  namespace :dns do
    get 'regions'
    resources :records, expect: [:show]
    resources :acls, expect: [:show]
  end


  #---------email ------------------
  get 'email' => 'email#index'
  namespace :email do
    resources :domains, expect: [:show]
    resources :users, expect: [:show]
    resources :aliases, only: [:destroy, :new, :create, :index]
  end

  #----------vpn-----------
  get 'vpn' => 'vpn#index'
  namespace :vpn do
    get 'logs' => 'logs#index'
    resources :users, expect: [:show]
  end

  #--------team work-----------
  resources :projects do
    resources :documents, controller: 'projects/documents' do
      get 'download'
      get 'viewer' 
    end
    resources(:stories, controller: 'projects/stories') do
      resources :tasks, controller: 'projects/tasks'
    end
  end

  #----------others---------

  get 'settings' => 'settings#index'

  get 'personal' => 'personal#index'
  namespace :personal do
    get 'logs'
    get 'public_key'
    post 'public_key'
    post 'generate_keys'
  end


  get 'document/*name' => 'home#document', as: :document_show
  get 'home' => 'home#index'
  post 'search' => 'home#search'

  devise_for :users, controllers: {registrations: 'registrations'}


  authenticate :user, lambda { |u| u.is_admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  root 'home#index'


end
